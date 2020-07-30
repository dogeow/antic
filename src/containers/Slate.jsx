import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import isHotkey from "is-hotkey";
import { css } from "emotion";
// 导入 Slate 编辑器的工厂函数。
import { Text, Editor, Transforms, Range, createEditor } from "slate";

// 导入 Slate 组件和 React 插件。
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSlate,
  useSelected,
  useFocused,
  useEditor,
  useReadOnly,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  withChecklists,
  withMentions,
  withTables,
  withHtml,
  withShortcuts,
} from "../markdown/With";
import { Button, Icon, Toolbar, Portal } from "../components";
import HOTKEYS from "../markdown/Hotkeys";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "check-list-item":
      return <CheckListItemElement {...props} />;
    case "mention":
      return <MentionElement {...props} />;
    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "code":
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case "link":
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );
    case "image":
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && "bold"};
        background-color: ${leaf.highlight && "#ffeeba"};
      `}
    >
      {children}
    </span>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const MentionElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "#eee",
        fontSize: "0.9em",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
      }}
    >
      @{element.character}
      {children}
    </span>
  );
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <img
        alt="img"
        src={element.url}
        className={css`
          display: block;
          max-width: 100%;
          max-height: 20em;
          box-shadow: ${selected && focused ? "0 0 0 2px blue;" : "none"};
        `}
      />
    </div>
  );
};

const insertMention = (editor, character) => {
  const mention = { type: "mention", character, children: [{ text: "" }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const CheckListItemElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const readOnly = useReadOnly();
  const { checked } = element;
  return (
    <div
      {...attributes}
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        & + & {
          margin-top: 0;
        }
      `}
    >
      <span
        contentEditable={false}
        className={css`
          margin-right: 0.75em;
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(
              editor,
              { checked: event.target.checked },
              { at: path }
            );
          }}
        />
      </span>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={css`
          flex: 1;
          opacity: ${checked ? 0.666 : 1};
          text-decoration: ${checked ? "line-through" : "none"};
          &:focus {
            outline: none;
          }
        `}
      >
        {children}
      </span>
    </div>
  );
};

const initialValue = [
  {
    children: [
      {
        text:
          "With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!",
      },
    ],
  },
  {
    type: "check-list-item",
    checked: true,
    children: [{ text: "Slide to the left." }],
  },
  {
    type: "check-list-item",
    checked: true,
    children: [{ text: "Slide to the right." }],
  },
  {
    type: "check-list-item",
    checked: false,
    children: [{ text: "Criss-cross." }],
  },
  {
    type: "check-list-item",
    checked: true,
    children: [{ text: "Criss-cross!" }],
  },
  {
    type: "check-list-item",
    checked: false,
    children: [{ text: "Cha cha real smooth…" }],
  },
  {
    type: "check-list-item",
    checked: false,
    children: [{ text: "Let's go to work!" }],
  },
  {
    children: [{ text: "Try it out for yourself!" }],
  },
];

const CHARACTERS = ["antic"];

const SlateEditor = () => {
  const ref = useRef();
  const [search, setSearch] = useState("");
  const editor = useMemo(
    () =>
      withChecklists(
        withHtml(
          withMentions(
            withShortcuts(withTables(withReact(withHistory(createEditor()))))
          )
        )
      ),
    []
  );
  const renderLeaf = (props) => <Leaf {...props} />;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const [value, setValue] = useState(initialValue);
  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];

      if (search && Text.isText(node)) {
        const { text } = node;
        const parts = text.split(search);
        let offset = 0;

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path, offset: offset - search.length },
              focus: { path, offset },
              highlight: true,
            });
          }

          offset = offset + part.length + search.length;
        });
      }

      return ranges;
    },
    [search]
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
          default:
            break;
        }
      }
      if (event.key === "`" && event.ctrlKey) {
        // 阻止插入 "`" 的默认行为。
        event.preventDefault();
        // 否则，把当前选择的 blocks 的类型设为 "code"。
        Transforms.setNodes(
          editor,
          { type: "code" },
          { match: (n) => Editor.isBlock(editor, n) }
        );
      }
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          toggleMark(editor, mark);
        }
      }
    },
    [index, target, chars, editor]
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        // 在 Local Storage 里保存值。
        // const content = JSON.stringify(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            setIndex(0);
            return;
          }
        }

        setTarget(null);
      }}
    >
      <Toolbar>
        <div
          className={css`
            position: relative;
          `}
        >
          <Icon
            className={css`
              position: absolute;
              top: 0.5em;
              left: 0.5em;
              color: #ccc;
            `}
          >
            search
          </Icon>
          <input
            type="search"
            placeholder="Search the text..."
            onChange={(e) => setSearch(e.target.value)}
            className={css`
              padding-left: 2em;
              width: 100%;
            `}
          />
        </div>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
      </Toolbar>
      <Editable
        decorate={decorate}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
        spellCheck
        autoFocus
        onKeyDown={onKeyDown}
      />
      {target && chars.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 1,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
          >
            {chars.map((char, i) => (
              <div
                key={char}
                style={{
                  padding: "1px 3px",
                  borderRadius: "3px",
                  background: i === index ? "#B4D5FF" : "transparent",
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};

export default SlateEditor;

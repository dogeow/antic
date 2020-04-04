import React, {PureComponent} from 'react';
import Heading from './Heading';
import {HashLink as Link} from 'react-router-hash-link';

class HeadingBlock extends PureComponent {
  renderHtml = () => {
    const {level, children} = this.props;

    const handleClick = (e) => {
      e.preventDefault();
    };

    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <Heading level={`h${level}`} id={nodeValue}>
          <span className="title">{children}</span>
          <Link to={`#${nodeValue}`} className="link" onClick={handleClick}>
            #
          </Link>
        </Heading>
      );
    } else {
      return <>{children}</>;
    }
  };

  render() {
    return <>{this.renderHtml()}</>;
  }
}

export default HeadingBlock;

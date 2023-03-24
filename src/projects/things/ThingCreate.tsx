import "./things.css";

import {
  Button,
  DatePicker,
  Dialog,
  Form,
  ImageUploader,
  Input,
  Selector,
  Stepper,
  Switch,
  TextArea,
  Toast,
} from "antd-mobile";
import dayjs from "dayjs";
import React, { useState } from "react";

import axios from "../../instance/axios";
import Bottom from "./Bottom";

function ThingCreate() {
  const formRef = React.createRef();

  const [fileList, setFileList] = useState([]);
  const [hasExpiredTime, setHasExpiredTime] = useState(false); // 新增状态来跟踪是否选择了过期时间

  const onFinish = (values) => {
    axios
      .post("/things", {
        ...values,
        expired_at: dayjs(values.expired_at).format("YYYY-MM-DD"),
        bought_at: dayjs(values.bought_at).format("YYYY-MM-DD"),
      })
      .then((res) => {
        Toast.show({
          icon: "success",
          content: "添加成功",
        });
      });
  };

  const uploadHandle = (file) => {
    return new Promise(function (resolve, reject) {
      const formData = new FormData();
      formData.append("key", "things");
      formData.append("things", file, file.name);
      axios
        .post("/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "image/*",
          },
          transformRequest: [(data) => data],
          onUploadProgress(e) {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              window.console.log(`${percentage}%`); // 上传进度
            }
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <div>
      <Form
        ref={formRef}
        layout="horizontal"
        onFinish={onFinish}
        style={{ marginBottom: 50 }}
        footer={
          <Button block type="submit" color="primary" size="large">
            确认添加
          </Button>
        }
      >
        <Form.Item label="名称" name="name" rules={[{ required: true, message: "名称不能为空" }]}>
          <Input placeholder="又大手大脚买了什么？" clearable />
        </Form.Item>
        <Form.Item label="照片" name="photos" rules={[{ required: true, message: "照片不能为空" }]}>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={uploadHandle}
            onDelete={() => {
              return Dialog.confirm({
                content: "是否确认删除",
              });
            }}
          />
        </Form.Item>
        <Form.Item name="tags" label="标签" rules={[{ required: true, message: "标签不能为空" }]}>
          <Selector
            columns={3}
            multiple
            options={[
              { label: "数码", value: "数码" },
              { label: "日用", value: "日用" },
              { label: "办公", value: "办公" },
            ]}
          />
        </Form.Item>
        <Form.Item name="description" label="详情">
          <TextArea placeholder="可以说说有了这个物品的心得吧！" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item
          name="amount"
          label="数量"
          childElementPosition="right"
          initialValue={1}
          rules={[
            {
              max: 100,
              min: 1,
              type: "number",
            },
          ]}
        >
          <Stepper />
        </Form.Item>
        <Form.Item
          name="money"
          label="金额"
          childElementPosition="right"
          rules={[
            {
              max: 100,
              min: 1,
              type: "number",
            },
          ]}
        >
          <Stepper digits={2} style={{ width: "140px" }} step={10} />
        </Form.Item>
        <Form.Item
          name="bought_at"
          label="购买时间"
          trigger="onConfirm"
          onClick={(e, datePickerRef) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker initialValues={new Date()}>
            {(value) => (value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期")}
          </DatePicker>
        </Form.Item>
        <Form.Item
          name="expired_at"
          label="过期时间"
          trigger="onConfirm"
          onClick={(e, datePickerRef) => {
            datePickerRef.current?.open();
            // 选择过期时间后，更新状态为true
            setHasExpiredTime(true);
          }}
        >
          <DatePicker>{(value) => (value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期")}</DatePicker>
        </Form.Item>
        <Form.Item name="is_expiration_reminder" label="过期提醒" childElementPosition="right">
          {/* 根据hasExpiredTime状态来更新disabled属性 */}
          <Switch disabled={!hasExpiredTime} />
        </Form.Item>
      </Form>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  );
}

export default ThingCreate;

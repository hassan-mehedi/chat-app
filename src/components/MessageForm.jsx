import React from "react";
import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const MessageForm = (props) => {
  const { chatId, creds } = props;
  const [value, setValue] = useState("");
  const submitHandler = (submit) => {
    submit.preventDefault();

    const text = value.trim();
    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }
    setValue("");
  };

  const uploadHandler = (attachedFiles) => {
    sendMessage(creds, chatId, { files: attachedFiles.target.files, text: "" });
  };
  const changeHandler = (change) => {
    setValue(change.target.value);
    isTyping(props, chatId);
  };
  return (
    <form action="" className="message-form" onSubmit={submitHandler}>
      <input
        type="text"
        className="message-input"
        placeholder="Enter the message..."
        onChange={changeHandler}
        onSubmit={submitHandler}
        value={value}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        onChange={uploadHandler}
        style={{ display: "none" }}
      />
      <button className="send-button" type="submit">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;

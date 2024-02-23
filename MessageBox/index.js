import { Message, MessageBox } from "element-ui";

/**
 * 确定提示弹窗
 * @param text 提示文本
 * @param title
 * @param options
 * @returns {Promise<unknown>}
 */
export function confirmTip(
  text,
  title = "系统提示",
  options = {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }
) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(text, title, options)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        Message.info("操作已取消");
        reject(false);
      });
  }).catch(() => { });
}
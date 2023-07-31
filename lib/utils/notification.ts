import { notification } from "antd";

interface notifyProps {
    title: string,
    message: string,
    type?: "error" | "info" | "success" | "warning";
}

const notify = ({ title, message, type="success" }: notifyProps) => {
    notification.open({
        type: type,
        message: title,
        description: message,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export default notify
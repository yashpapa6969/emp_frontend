
import { Checkbox } from "antd";
import { useState } from "react";

const TodoCheckbox = ({ done, title }) => {
    const [value, setValue] = useState(done);

    return (
        <Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} className={`${value ? "line-through" : ""}`}>{title}</Checkbox>
    )
}

export default TodoCheckbox
import { Tag } from "../typings";

export default function TagComponent({createdAt, label, value, userId, color} : Tag) {

    return (
        <div className="px-3 py-1 white rounded" style={{background: color}}>
            {label}
        </div>
    )
}
import { Tag } from "../typings";
import chroma from 'chroma-js';

export default function TagComponent({createdAt, label, value, userId, color} : Tag) {
    const chrome = chroma(color)
    return (
        <div className="tag" style={{color: color, backgroundColor: chrome.alpha(0.1).hex()}}>
            {label}
        </div>
    )
}
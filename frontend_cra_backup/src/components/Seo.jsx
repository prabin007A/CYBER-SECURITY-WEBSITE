import { useEffect } from "react";

const setMeta = (selector, attrs, content) => {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

export default function Seo({ title, description }) {
    useEffect(() => {
        document.title = title;
        setMeta('meta[name="description"]', { name: "description" }, description);
        setMeta('meta[property="og:title"]', { property: "og:title" }, title);
        setMeta('meta[property="og:description"]', { property: "og:description" }, description);
    }, [title, description]);
    return null;
}

export default function getKind(v) {
    const kinds = [
        { key: 1, value: "Story" },
        { key: 2, value: "News" },
        { key: 3, value: "Conversation" },
        { key: 4, value: "Quotes" },
        { key: 5, value: "All" }
    ];

    const kind = kinds.find(item => item.key === parseInt(v));
    return kind ? kind.value : null;
}
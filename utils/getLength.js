export default function getLength(v) {
    const kinds = [
        { key: 1, value: "Short" },
        { key: 2, value: "Medium" },
        { key: 3, value: "Long" },
    ];

    const kind = kinds.find(item => item.key === parseInt(v));
    return kind ? kind.value : null;
}
export default function getLanguange(v) {
    const languanges = [
        { key: 1, value: "English" },
        { key: 2, value: "Spanish" },
        { key: 3, value: "Indonesia" },
    ];

    const languange = languanges.find(item => item.key === v);
    return languange ? languange.value : null;
}
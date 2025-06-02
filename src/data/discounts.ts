export type DiscountOption = {
    label: string;
    value: string;   // e.g. "25%"
    numeric: number; // e.g. 0.25
};

const discountOptions: DiscountOption[] = Array.from({ length: 21 }, (_, i) => {
    const percent = i * 5;
    return {
        label: `${percent}% off`,
        value: `${percent}%`,
        numeric: percent / 100
    };
});

export default discountOptions;

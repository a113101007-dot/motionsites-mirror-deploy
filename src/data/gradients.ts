export type GradientPack = {
  id: string;
  title: string;
  count: number;
  description: string;
  css: string;
};

export const gradientPacks: GradientPack[] = [
  {
    id: "glass-redline",
    title: "玻璃红线",
    count: 24,
    description: "适合高转化首屏背景的热红与玫瑰色玻璃渐变。",
    css: "radial-gradient(circle at 20% 15%, rgba(255,101,137,.72), transparent 28%), radial-gradient(circle at 82% 12%, rgba(255,183,74,.42), transparent 24%), linear-gradient(135deg, #171717 0%, #2a1015 52%, #ff0432 120%)",
  },
  {
    id: "carbon-prism",
    title: "碳黑棱镜",
    count: 18,
    description: "细腻的炭黑层次，搭配聚焦转化的窄幅高亮色边。",
    css: "radial-gradient(circle at 76% 22%, rgba(255,47,95,.55), transparent 22%), linear-gradient(160deg, #111111 0%, #242424 46%, #35151c 100%)",
  },
  {
    id: "ember-grid",
    title: "余烬网格",
    count: 21,
    description: "为卡片网格、页脚和行动号召区域设计的暖色发布渐变。",
    css: "linear-gradient(120deg, rgba(255,101,137,.96), rgba(255,4,50,.82)), radial-gradient(circle at 10% 90%, rgba(255,183,74,.64), transparent 34%), #171717",
  },
  {
    id: "midnight-sale",
    title: "午夜促销",
    count: 13,
    description: "适合高端销售页的深色渐变，提供清晰的文字对比度。",
    css: "radial-gradient(circle at 50% -20%, rgba(255,101,137,.62), transparent 34%), linear-gradient(180deg, #171717 0%, #211719 52%, #0e0e0e 100%)",
  },
];

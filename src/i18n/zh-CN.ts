export const categoryLabels: Record<string, string> = {
  "Landing Pages": "落地页",
  "Hero Sections": "首屏区域",
  Pricing: "定价",
  Agency: "代理商与工作室",
  SaaS: "SaaS",
  CTA: "行动号召",
  "Social Proof": "社会证明",
  Features: "功能展示",
  Footers: "页脚",
  "HorizonX Library": "HorizonX 提示词库",
  "21st.dev Registry": "21st.dev 组件库",
  "Superdesign Canvas": "Superdesign 画布",
};

export function getCategoryLabel(category?: string) {
  if (!category) return "未分类";
  return categoryLabels[category] ?? category;
}

export const searchCategoryChips = [
  { label: "全部提示词", category: "" },
  { label: "落地页", category: "Landing Pages" },
  { label: "HorizonX 提示词库", category: "HorizonX Library" },
  { label: "21st.dev 组件库", category: "21st.dev Registry" },
  { label: "Superdesign 画布", category: "Superdesign Canvas" },
  { label: "SaaS", category: "SaaS" },
] as const;

export const categoryAliases: Record<string, string> = {
  落地页: "Landing Pages",
  着陆页: "Landing Pages",
  首屏: "Hero Sections",
  英雄区: "Hero Sections",
  定价: "Pricing",
  价格: "Pricing",
  代理商: "Agency",
  工作室: "Agency",
  行动号召: "CTA",
  转化按钮: "CTA",
  社会证明: "Social Proof",
  用户评价: "Social Proof",
  功能: "Features",
  功能展示: "Features",
  页脚: "Footers",
  底部: "Footers",
  "horizonx 提示词库": "HorizonX Library",
  "21st.dev 组件库": "21st.dev Registry",
  "superdesign 画布": "Superdesign Canvas",
};

export const sourceModeLabels = {
  original: "原始来源",
  reconstruction: "工作版重建",
} as const;

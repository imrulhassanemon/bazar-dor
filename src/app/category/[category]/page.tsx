import CategoryClient from "./CategoryClient";

export const instant = false;

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return <CategoryClient params={params} />;
}
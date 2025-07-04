import SaveArticle from "@/components/save-article"

export default function Blog() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      This is a /blog page
      <SaveArticle />
    </div>
  );
}

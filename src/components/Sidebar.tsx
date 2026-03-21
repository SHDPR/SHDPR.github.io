import AboutWidget from "./widgets/AboutWidget";
import CategoryWidget from "./widgets/CategoryWidget";
import LatestPostsWidget from "./widgets/LatestPostsWidget";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-full lg:w-64 shrink-0">
      <AboutWidget />
      <CategoryWidget />
      <LatestPostsWidget />
    </aside>
  );
}

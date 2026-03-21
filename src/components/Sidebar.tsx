import AboutWidget from "./widgets/AboutWidget";
import CategoryWidget from "./widgets/CategoryWidget";
import PopularPostsWidget from "./widgets/PopularPostsWidget";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
      <AboutWidget />
      <CategoryWidget />
      <PopularPostsWidget />
    </aside>
  );
}

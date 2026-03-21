export default function AboutWidget() {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        소개
      </h3>
      <img src="/avatar.svg" alt="avatar" className="w-14 h-14 rounded-full mb-3" />
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        안녕하세요, SHDPR입니다. 기술, 여행, 커리어, 일상 등 관심 있는 것들을 씁니다.
      </p>
    </div>
  );
}

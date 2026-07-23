'use client';

export default function ClickAcademyAction() {
  const handleClick = () => {
    console.log('Select academy');
  };

  return (
    <button
      type="button"
      className="border-custom-slate-border text-text-side hover:border-custom-indigo-border hover:bg-custom-indigo-bg hover:text-custom-indigo flex cursor-pointer items-center justify-center rounded-full border bg-transparent px-3 py-1 text-xs font-bold transition-all"
      onClick={handleClick}
    >
      반포점짱솔학원
    </button>
  );
}

import { Check, CheckCircle } from "lucide-react";

function ThemeCard({ theme, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
            relative
            rounded-xl
            overflow-hidden
            border
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-lg
            scale-[0.9]
 ${
   selected
     ? "border-indigo-500 ring-2 ring-indigo-200 scale-[1] shadow-lg"
     : "border-slate-200"
 }
`}
    >
      {selected && (
        <div className="absolute bottom-2 right-3 w-6 h-6 rounded-full bg-indigo-500 border-2 border-indigo-500 flex items-center justify-center shadow-sm">
          <Check className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      {/* Banner */}

      <div
        className="h-12"
        style={{
          backgroundImage: theme.banner,
          backgroundSize: theme.bannerSize || "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Preview */}
      <div
        className="p-4"
        style={{
          background: theme.background,
        }}
      >
        <div
          className="w-10 h-10 rounded-full mx-auto mb-3"
          style={{
            background: theme.accent,
          }}
        />

        <div
          className="h-2 rounded w-20 mx-auto"
          style={{
            background: theme.text,
            opacity: 0.8,
          }}
        />

        <div
          className="mt-2 h-2 rounded w-14 mx-auto"
          style={{
            background: theme.secondaryText,
            opacity: 0.4,
          }}
        />

        <div
          className="mt-4 rounded-lg h-8"
          style={{
            background: theme.buttonBackground,
            border: `1px solid ${theme.buttonBorder}`,
          }}
        />
      </div>

      <div className="border-t bg-white px-3 py-2">
        <p className="font-medium text-sm text-slate-700">{theme.name}</p>
      </div>
    </button>
  );
}

export default ThemeCard;

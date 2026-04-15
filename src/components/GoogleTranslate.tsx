import { useEffect, useRef, useState } from "react";
import { FiGlobe, FiChevronDown } from "react-icons/fi";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("en");
  const containerRef = useRef<HTMLDivElement>(null);

  // Load Google Translate script and hide its native widget
  useEffect(() => {
    (window as unknown as Record<string, unknown>)["googleTranslateElementInit"] = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "gt_hidden_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = (code: string) => {
    setSelected(code);
    setOpen(false);

    // Drive the hidden Google Translate select element
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  };

  const currentLabel = languages.find((l) => l.code === selected)?.label ?? "English";

  return (
    <>
      {/* Hidden Google Translate native widget */}
      <div id="gt_hidden_element" style={{ display: "none" }} />

      {/* Custom floating language picker */}
      <div
        ref={containerRef}
        style={{ zIndex: 9999 }}
        className="fixed bottom-6 right-6"
      >
        {/* Dropdown list */}
        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                  selected === lang.code
                    ? "bg-[#13b5a3] text-white font-semibold"
                    : "text-gray-700 hover:bg-[#e6f7f5] hover:text-[#0a2540]"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}

        {/* Trigger button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2 text-sm font-semibold text-[#0a2540] hover:border-[#13b5a3] hover:text-[#13b5a3] transition-colors duration-200"
        >
          <FiGlobe className="text-[#13b5a3] text-base" />
          <span>{currentLabel}</span>
          <FiChevronDown
            className={`text-gray-400 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </>
  );
}

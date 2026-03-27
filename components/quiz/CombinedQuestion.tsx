"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QuizQuestion } from "@/types/quiz";
import { MultiSelectCard } from "./MultiSelectCard";
import { TipCard } from "./TipCard";

interface CombinedQuestionProps {
  question: QuizQuestion;
  locale: "fr" | "en";
  onSubmit: (selectedOptions: string[], textValue: string) => void;
  isSubmitting?: boolean;
}

export function CombinedQuestion({
  question,
  locale,
  onSubmit,
  isSubmitting,
}: CombinedQuestionProps) {
  const t = useTranslations("quiz");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textValue, setTextValue] = useState("");

  const maxSelect = question.maxSelect || 3;
  const maxLength = question.maxLength || 500;

  const toggleOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prev) => prev.filter((v) => v !== value));
    } else if (selectedOptions.length < maxSelect) {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onSubmit(selectedOptions, textValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tip */}
      {question.hint && (
        <TipCard
          label={t("tipLabel")}
          text={question.hint[locale]}
          variant="conseil"
        />
      )}

      {/* Part A — Multi-select */}
      <div>
        <p className="text-[12px] text-[#777774] mb-4">
          {t("selectMax", { max: maxSelect })}
        </p>
        <div className="space-y-3 stagger">
          {question.options?.map((opt, i) => (
            <MultiSelectCard
              key={opt.value}
              text={opt.text[locale]}
              value={opt.value}
              selected={selectedOptions.includes(opt.value)}
              disabled={
                selectedOptions.length >= maxSelect &&
                !selectedOptions.includes(opt.value)
              }
              onToggle={toggleOption}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Part B — Free text */}
      <div>
        <label className="block text-[14px] font-semibold text-[#2E2F2D] mb-3">
          {t("openTextLabel")}
        </label>
        <div className="bg-[#F5F3EF] rounded-[16px] p-4 mb-2">
          <p className="text-[12px] text-[#777774] italic leading-[1.5]">
            {locale === "fr"
              ? "« L'honnêteté est le premier chapitre du livre de la sagesse. » — Prenez un instant pour écouter votre cœur sans jugement."
              : "« Honesty is the first chapter in the book of wisdom. » — Take a moment to listen to your heart without judgment."}
          </p>
        </div>
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value.slice(0, maxLength))}
          placeholder={t("openTextPlaceholder")}
          rows={4}
          className="w-full bg-[#FFFFFF] rounded-[20px] p-4 text-[14px] text-[#2E2F2D] placeholder:text-[#AEADAA] resize-none outline-none focus:ring-2 focus:ring-[#AA2C32]/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)] leading-[1.6]"
        />
        <div className="text-right mt-1">
          <span className="text-[11px] text-[#AEADAA]">
            {textValue.length}/{maxLength}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0 || isSubmitting}
        className="btn-gradient w-full text-white font-semibold text-[16px] py-4 rounded-full shadow-[0_4px_20px_rgba(170,44,50,0.3)] disabled:opacity-50 active:scale-[0.98] transition-all"
      >
        {isSubmitting ? t("loading") : t("finishQuiz")}
      </button>
    </div>
  );
}

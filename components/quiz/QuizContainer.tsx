"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { ProgressBar } from "./ProgressBar";
import { OptionCard } from "./OptionCard";
import { MultiSelectCard } from "./MultiSelectCard";
import { SliderQuestion } from "./SliderQuestion";
import { TipCard } from "./TipCard";
import { CombinedQuestion } from "./CombinedQuestion";
import { EmailCapture } from "./EmailCapture";
import { QuizAnswer, CombinedAnswer } from "@/types/quiz";

export function QuizContainer() {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("quiz");
  const router = useRouter();
  const {
    state,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    isSubmitting,
    error,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentAnswer,
  } = useQuiz();

  const [animDirection, setAnimDirection] = useState<"left" | "right">("left");
  const [animKey, setAnimKey] = useState(0);

  const currentAnswer = getCurrentAnswer();

  // Single select — auto-advance
  const handleSingleSelect = useCallback(
    async (value: string) => {
      let answerValue: QuizAnswer = value;
      if (currentQuestion.options) {
        const opt = currentQuestion.options.find((o) => o.value === value);
        if (opt?.score !== undefined) answerValue = opt.score;
      }
      answerQuestion(answerValue);
      setTimeout(async () => {
        setAnimDirection("left");
        setAnimKey((k) => k + 1);
        await nextQuestion();
      }, 350);
    },
    [currentQuestion, answerQuestion, nextQuestion]
  );

  // Multi select toggle
  const handleMultiToggle = useCallback(
    (value: string) => {
      const current = (currentAnswer as string[]) || [];
      const maxSelect = currentQuestion.maxSelect || 99;
      if (current.includes(value)) {
        answerQuestion(current.filter((v) => v !== value));
      } else if (current.length < maxSelect) {
        answerQuestion([...current, value]);
      }
    },
    [currentAnswer, currentQuestion, answerQuestion]
  );

  // Slider change
  const handleSliderChange = useCallback(
    (value: number) => {
      answerQuestion(value);
    },
    [answerQuestion]
  );

  // Combined question submit (Q20)
  const handleCombinedSubmit = useCallback(
    async (selectedOptions: string[], textValue: string) => {
      const combined: CombinedAnswer = { multiSelect: selectedOptions, text: textValue };
      answerQuestion(combined);
      setAnimDirection("left");
      setAnimKey((k) => k + 1);
      await nextQuestion();
    },
    [answerQuestion, nextQuestion]
  );

  const handleNext = useCallback(async () => {
    setAnimDirection("left");
    setAnimKey((k) => k + 1);
    await nextQuestion();
  }, [nextQuestion]);

  const handleBack = useCallback(() => {
    setAnimDirection("right");
    setAnimKey((k) => k + 1);
    previousQuestion();
  }, [previousQuestion]);

  if (state.phase === "email") {
    return (
      <EmailCapture
        sessionId={state.sessionId}
        onSuccess={(sessionId) => router.push(`/${locale}/result/${sessionId}`)}
      />
    );
  }

  if (!currentQuestion) return null;

  const selectedValues = (currentAnswer as string[]) || [];

  const needsContinue =
    currentQuestion.type === "multi" ||
    currentQuestion.type === "text" ||
    currentQuestion.type === "slider";
  // "combined" excluded — CombinedQuestion has its own submit button

  const sliderValue =
    currentQuestion.type === "slider"
      ? (currentAnswer as number | undefined)
      : undefined;

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col">
      {/* Header */}
      <div className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[520px] mx-auto">
          <div className="px-5 pt-4 pb-1 flex items-center justify-between">
            <span className="font-display font-normal italic text-[17px] text-[#1A1916]">
              CoupleCheck
            </span>
          </div>
          <ProgressBar
            current={state.currentQuestion}
            total={totalQuestions}
            onBack={state.currentQuestion > 0 ? handleBack : undefined}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 pt-28 pb-8 px-5 max-w-[520px] mx-auto w-full">
        <div
          key={animKey}
          className={`animate-${animDirection === "left" ? "slide-left" : "slide-right"}`}
        >
          {/* Question text */}
          <h2 className="font-display font-normal text-[22px] text-[#1A1916] leading-[1.3] tracking-[-0.02em] mb-6">
            {currentQuestion.text[locale]}
          </h2>

          {/* Single select */}
          {currentQuestion.type === "single" && currentQuestion.options && (
            <div className="space-y-3 stagger">
              {currentQuestion.options.map((opt, i) => (
                <OptionCard
                  key={opt.value}
                  text={opt.text[locale]}
                  value={opt.value}
                  selected={
                    currentAnswer !== undefined &&
                    (currentAnswer === opt.value || currentAnswer === opt.score)
                  }
                  onSelect={handleSingleSelect}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* Multi select */}
          {currentQuestion.type === "multi" && currentQuestion.options && (
            <>
              <p className="text-[12px] text-[#777774] mb-4">
                {t("selectMax", { max: currentQuestion.maxSelect || 3 })}
              </p>
              <div className="space-y-3 stagger">
                {currentQuestion.options.map((opt, i) => (
                  <MultiSelectCard
                    key={opt.value}
                    text={opt.text[locale]}
                    value={opt.value}
                    selected={selectedValues.includes(opt.value)}
                    disabled={
                      selectedValues.length >= (currentQuestion.maxSelect || 3) &&
                      !selectedValues.includes(opt.value)
                    }
                    onToggle={handleMultiToggle}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}

          {/* Slider */}
          {currentQuestion.type === "slider" && (
            <SliderQuestion
              value={sliderValue}
              min={currentQuestion.sliderMin ?? 0}
              max={currentQuestion.sliderMax ?? 10}
              labels={currentQuestion.sliderLabels}
              locale={locale}
              onChange={handleSliderChange}
            />
          )}

          {/* Text — tip above textarea */}
          {currentQuestion.type === "text" && (
            <div>
              {currentQuestion.hint && (
                <TipCard
                  label={t("tipLabel")}
                  text={currentQuestion.hint[locale]}
                  variant="quote"
                />
              )}
              <div className="mt-4">
                <textarea
                  value={(currentAnswer as string) || ""}
                  onChange={(e) => answerQuestion(e.target.value)}
                  placeholder={currentQuestion.placeholder?.[locale] || t("textPlaceholder")}
                  maxLength={currentQuestion.maxLength || 500}
                  rows={5}
                  className="w-full bg-white border border-[#E0DDD6] focus:border-[#AA2C32] rounded-[10px] p-4 text-[14px] text-[#1A1916] placeholder:text-[#C8C5BF] resize-none outline-none transition-colors duration-150 leading-[1.65]"
                />
                <div className="text-right mt-1">
                  <span className="text-[11px] text-[#AEADAA]">
                    {((currentAnswer as string) || "").length}/{currentQuestion.maxLength || 500}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Combined (Q20) */}
          {currentQuestion.type === "combined" && (
            <CombinedQuestion
              question={currentQuestion}
              locale={locale}
              onSubmit={handleCombinedSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Tip card — below options for single/multi/slider */}
          {currentQuestion.type !== "text" &&
            currentQuestion.type !== "combined" &&
            currentQuestion.hint && (
              <div className="mt-5">
                <TipCard
                  label={t("tipLabel")}
                  text={currentQuestion.hint[locale]}
                  variant="conseil"
                />
              </div>
            )}
        </div>

        {error && (
          <p className="mt-4 text-[13px] text-red-500 text-center">{error}</p>
        )}
      </div>

      {/* Continue button for non-auto-advance types */}
      {needsContinue && (
        <div className="sticky bottom-0 px-5 pb-8 pt-4 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC] to-transparent max-w-[520px] mx-auto w-full">
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-full bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-3.5 rounded-[10px] disabled:opacity-40 transition-colors duration-150"
          >
            {isSubmitting ? t("loading") : t("next")}
          </button>
        </div>
      )}
    </div>
  );
}

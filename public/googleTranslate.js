function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "zh-CN",
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}
googleTranslateElementInit();

/**
 * display in console（在控制台显示）
 */
export default function displayInConsole() {
  window.console.log(
    `%c
  .---.          ,-----.     ,---.  ,---.     .-''-.
  | ,_|        .'  .-,  '.   |   /  |   |   .'_ _   \\
,-./  )       / ,-.|  \\ _ \\  |  |   |  .'  / ( \` )   '
\\  '_ '\`)    ;  \\  '_ /  | : |  | _ |  |  . (_ o _)  |
 > (_)  )    |  _\`,/ \\ _/  | |  _( )_  |  |  (_,_)___|
(  .  .-'    : (  '\\_/ \\   ; \\ (_ o._) /  '  \\   .---.
 \`-'\`-'|___   \\ \`"/  \\  ) /   \\ (_,_) /    \\  \`-'    /
  |        \\   '. \\_/\`\`".'     \\     /      \\       /
  \`--------\`     '-----'        \`---\`        \`'-..-'

`,
    "color: pink"
  );
}
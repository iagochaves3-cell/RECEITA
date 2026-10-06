/* Deliberately closed until a separately reviewed clinical integration exists.
 * No token, dose calculation, draft promotion, or capability-driven auto-enable.
 */
(function (root) {
  'use strict';
  const MESSAGE = 'Prescrição indisponível: nenhum regime validado foi integrado.';
  function lock(document) {
    const form = document.getElementById('prescriptionForm');
    const output = document.getElementById('resultadoPrescrição');
    const content = document.getElementById('resultadoConteudo');
    const status = document.getElementById('prescriptionUnavailable');
    if (form) {
      form.querySelectorAll('input, select, textarea, button, fieldset').forEach(el => { el.disabled = true; });
      form.setAttribute('aria-disabled', 'true');
    }
    if (output) {
      output.hidden = true;
      output.style.display = 'none';
      output.querySelectorAll('.result-actions button').forEach(el => { el.disabled = true; });
    }
    if (content) content.textContent = '';
    if (status) status.textContent = MESSAGE;
  }
  function install(document) {
    lock(document);
    const prevent = event => { event.preventDefault(); event.stopImmediatePropagation(); lock(document); };
    const form = document.getElementById('prescriptionForm');
    if (form) form.addEventListener('submit', prevent, true);
    const output = document.getElementById('resultadoPrescrição');
    if (output) output.querySelectorAll('.result-actions button').forEach(el => el.addEventListener('click', prevent, true));
    document.addEventListener('input', () => lock(document), true);
    if (root.addEventListener) root.addEventListener('beforeprint', () => lock(document));
  }
  if (typeof module !== 'undefined') module.exports = { install, lock };
  if (root.document) root.document.addEventListener('DOMContentLoaded', () => install(root.document));
})(globalThis);

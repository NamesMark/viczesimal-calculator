import n,{calculate_vicz_expression as d}from"./src/assets/rust_viczesimal/pkg/rust_viczesimal.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function c(r){return await n(),d(r)}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('input[type="button"]').forEach(a=>{a.addEventListener("click",async s=>{switch(s.target.dataset.action){case"calculate":const e=await c(calculator.display.value);calculator.resultDisplay.value=e;break;case"calculate+20":calculator.display.value+=" + 10";const t=await c(calculator.display.value);calculator.resultDisplay.value=t;break;case"calculate-20":calculator.display.value+=" - 10";const l=await c(calculator.display.value);calculator.resultDisplay.value=l;break;case"calculate*20":calculator.display.value+=" * 10";const u=await c(calculator.display.value);calculator.resultDisplay.value=u;break;case"calculate/20":calculator.display.value+=" / 10";const i=await c(calculator.display.value);calculator.resultDisplay.value=i;break}})})});

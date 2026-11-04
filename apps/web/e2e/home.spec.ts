import { expect, test } from "@playwright/test";

test("carga la portada analítica y muestra la telemetría del Gran Sabio", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Tempest Archive" })).toBeVisible();
  await expect(page.getByText("TELEMETRÍA DE BASE DE DATOS")).toBeVisible();
});

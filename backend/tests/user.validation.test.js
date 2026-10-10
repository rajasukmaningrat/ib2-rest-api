import test from "node:test";
import assert from "node:assert/strict";
import { isValidUserId } from "../src/utils/user.validation.js";

test("menerima ID user berupa angka positif", () => {
  assert.equal(isValidUserId("1"), true);
  assert.equal(isValidUserId("25"), true);
  assert.equal(isValidUserId("999"), true);
});

test("menolak ID user yang tidak valid", () => {
  assert.equal(isValidUserId("abc"), false);
  assert.equal(isValidUserId("0"), false);
  assert.equal(isValidUserId("-1"), false);
  assert.equal(isValidUserId("1.5"), false);
  assert.equal(isValidUserId(""), false);
  assert.equal(isValidUserId(" "), false);
  assert.equal(isValidUserId("12abc"), false);
});
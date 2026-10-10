import test, { mock } from "node:test";
import assert from "node:assert/strict";

mock.module("../src/services/user.service.js", {
  exports: {
    getUsers: async () => [],
    getUserById: async () => null,
    createUser: async () => {
      throw new Error("createUser tidak boleh dipanggil");
    },
    updateUser: async () => {
      throw new Error("updateUser tidak boleh dipanggil");
    },
    deleteUser: async () => {
      throw new Error("deleteUser tidak boleh dipanggil");
    }
  }
});

const { showUser, storeUser, editUser } = await import(
  "../src/controllers/user.controller.js"
);

const createMockResponse = () => ({
  statusCode: 200,
  body: undefined,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    this.body = data;
    return this;
  }
});

test("showUser menolak ID tidak valid", async (t) => {
  for (const id of ["abc", "0", "-1", "1.5", ""]) {
    await t.test(`menolak ID ${id}`, async () => {
      const req = { params: { id } };
      const res = createMockResponse();

      await showUser(req, res);

      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, {
        message: "ID user tidak valid"
      });
    });
  }
});

test("storeUser menolak body yang bukan object", async (t) => {
  for (const body of [null, [], "invalid"]) {
    await t.test(`menolak body ${JSON.stringify(body)}`, async () => {
      const req = { body };
      const res = createMockResponse();

      await storeUser(req, res);

      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, {
        message: "Request body harus berupa object"
      });
    });
  }
});

test("storeUser menolak email tidak valid", async () => {
  const req = {
    body: {
      fullname: "Rajo",
      username: "rajo",
      email: "email-invalid",
      password: "password123"
    }
  };
  const res = createMockResponse();

  await storeUser(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: "Format email tidak valid"
  });
});

test("storeUser menolak password terlalu pendek", async () => {
  const req = {
    body: {
      fullname: "Rajo",
      username: "rajo",
      email: "rajo@example.com",
      password: "123"
    }
  };
  const res = createMockResponse();

  await storeUser(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: "Password minimal 8 karakter"
  });
});

test("editUser menolak body kosong", async () => {
  const req = {
    params: { id: "1" },
    body: {}
  };
  const res = createMockResponse();

  await editUser(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: "Field update kosong atau tidak diizinkan"
  });
});

test("editUser menolak field yang tidak diizinkan", async () => {
  const req = {
    params: { id: "1" },
    body: { isAdmin: true }
  };
  const res = createMockResponse();

  await editUser(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    message: "Field update kosong atau tidak diizinkan"
  });
});
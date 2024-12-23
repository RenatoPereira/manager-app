import { getUserLocale, setUserLocale } from "./database.locale";
import { cookies } from "next/headers";
import { defaultLocale } from "./config.locale";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("database.locale", () => {
  // Create a mock cookie store for testing
  const mockCookieStore = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Setup the cookies mock to return our mockCookieStore
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);
  });

  describe("getUserLocale", () => {
    it("should return the locale from cookie when it exists", async () => {
      // Setup
      const expectedLocale = "pt-br";
      mockCookieStore.get.mockReturnValue({ value: expectedLocale });

      // Execute
      const result = await getUserLocale();

      // Assert
      expect(result).toBe(expectedLocale);
      expect(mockCookieStore.get).toHaveBeenCalledWith("NEXT_LOCALE");
    });

    it("should return defaultLocale when cookie does not exist", async () => {
      // Setup
      mockCookieStore.get.mockReturnValue(undefined);

      // Execute
      const result = await getUserLocale();

      // Assert
      expect(result).toBe(defaultLocale);
      expect(mockCookieStore.get).toHaveBeenCalledWith("NEXT_LOCALE");
    });
  });

  describe("setUserLocale", () => {
    it("should set the locale in cookies", async () => {
      // Setup
      const localeToSet = "es";

      // Execute
      await setUserLocale(localeToSet);

      // Assert
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "NEXT_LOCALE",
        localeToSet
      );
    });
  });
});

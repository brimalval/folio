import { render, screen } from "@/lib/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Hero from "../hero";

// Mock React Three Fiber components for jsdom
vi.mock("@react-three/fiber", () => ({
  Canvas: ({
    children,
    fallback,
  }: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) => <div data-testid="r3f-canvas">{children || fallback}</div>,
  useFrame: vi.fn(),
}));

vi.mock("@react-three/drei", () => ({
  Float: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="r3f-float">{children}</div>
  ),
  MeshDistortMaterial: () => <div data-testid="r3f-material" />,
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Content Rendering", () => {
    it("renders the name from profile", () => {
      render(<Hero />);
      expect(screen.getByText("Brian Valencia")).toBeInTheDocument();
    });

    it("renders the title from profile", () => {
      render(<Hero />);
      const titles = screen.getAllByText(/Full-Stack Software Engineer/i);
      expect(titles.length).toBeGreaterThan(0);
    });

    it("renders the bio from profile", () => {
      render(<Hero />);
      expect(
        screen.getByText(
          /Full-stack Software Engineer with DevOps experience/i,
        ),
      ).toBeInTheDocument();
    });

    it("has a hero section container with proper test id", () => {
      render(<Hero />);
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });
  });

  describe("CTA Buttons", () => {
    it("renders a primary CTA link", () => {
      render(<Hero />);
      const ctaLinks = screen.getAllByRole("link");
      expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
    });

    it("renders contact/link buttons with accessible labels", () => {
      render(<Hero />);
      const ctaLinks = screen
        .getAllByRole("link")
        .filter(
          (link) =>
            link.getAttribute("href") === "#projects" ||
            link.getAttribute("href")?.startsWith("mailto:"),
        );
      expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("3D Element", () => {
    it("renders 3D canvas or fallback element", () => {
      render(<Hero />);
      // Either canvas (for WebGL) or gradient fallback should be present
      const canvas = screen.queryByTestId("r3f-canvas");
      const fallback = screen.queryByTestId("hero-3d-fallback");
      expect(canvas || fallback).toBeTruthy();
    });
  });

  describe("Scroll Indicator", () => {
    it("renders scroll indicator", () => {
      render(<Hero />);
      expect(screen.getByTestId("scroll-indicator")).toBeInTheDocument();
    });

    it("scroll indicator has animation attributes", () => {
      render(<Hero />);
      const scrollIndicator = screen.getByTestId("scroll-indicator");
      // Check for motion/animation-related attributes or class
      expect(scrollIndicator.className).toMatch(/animate|motion|scroll/);
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy (h1 for name)", () => {
      render(<Hero />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Brian Valencia");
    });

    it("has visible focus states for interactive elements", () => {
      render(<Hero />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link.className).toMatch(/focus|ring|outline/);
      });
    });
  });

  describe("Japanese Ma Principle (Generous Spacing)", () => {
    it("applies generous spacing to hero section", () => {
      render(<Hero />);
      const hero = screen.getByTestId("hero-section");
      // Should have padding/margin classes indicating generous spacing
      expect(hero.className).toMatch(/p-|py-|px-|m-|my-|mx-|gap-/);
    });
  });
});

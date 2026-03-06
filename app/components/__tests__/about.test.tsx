import React from "react";
import { render, screen } from "@/lib/test-utils";
import { describe, it, expect, vi } from "vitest";
import About from "../about";

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const MotionTag = String(prop) as keyof React.JSX.IntrinsicElements;
        return function MotionComponent({
          children,
          initial,
          animate,
          exit,
          variants,
          whileInView,
          viewport,
          transition,
          whileHover,
          whileTap,
          layout,
          layoutId,
          ...rest
        }: React.HTMLAttributes<HTMLElement> & {
          children?: React.ReactNode;
          initial?: unknown;
          animate?: unknown;
          exit?: unknown;
          variants?: unknown;
          whileInView?: unknown;
          viewport?: unknown;
          transition?: unknown;
          whileHover?: unknown;
          whileTap?: unknown;
          layout?: unknown;
          layoutId?: unknown;
        }) {
          void initial;
          void animate;
          void exit;
          void variants;
          void whileInView;
          void viewport;
          void transition;
          void whileHover;
          void whileTap;
          void layout;
          void layoutId;
        return React.createElement(MotionTag, rest, children);
      };
      },
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
}));

describe("About", () => {
  it("renders the photo img element with correct alt text", () => {
    render(<About />);
    expect(
      screen.getByAltText("Brian Valencia at Glico Running Man, Osaka"),
    ).toBeInTheDocument();
  });

  it('renders the h2 heading "I build things that work."', () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "I build things that work.",
    );
  });

  it("renders philosophy statements (somewhere between 'make it work' and 'make it right')", () => {
    render(<About />);
    expect(
      screen.getByText(/Somewhere between \"make it work\"/i),
    ).toBeInTheDocument();
  });

  it("renders location text (Philippines)", () => {
    render(<About />);
    expect(screen.getByText("Philippines")).toBeInTheDocument();
  });

  it("renders interests (Learning Japanese)", () => {
    render(<About />);
    expect(screen.getByText("Learning Japanese")).toBeInTheDocument();
  });

  it("renders availability text (Open to opportunities)", () => {
    render(<About />);
    expect(screen.getByText("Open to opportunities")).toBeInTheDocument();
  });

  it("has two-column grid layout class on desktop", () => {
    render(<About />);
    const section = document.querySelector(".section-about");
    const grid = section?.querySelector(".grid");
    expect(grid?.className).toMatch(/md:grid-cols-2/);
  });
});

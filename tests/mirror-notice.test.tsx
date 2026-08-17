import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MirrorNoticePage } from "../src/components/MirrorNoticePage";

describe("MirrorNoticePage", () => {
  it("discloses the mirror identity, upstream source, and contact", () => {
    render(
      <MemoryRouter>
        <MirrorNoticePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /unofficial mirror/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /upstream repository/i })).toHaveAttribute(
      "href",
      "https://github.com/nomaan5541/motionsites-prompt-collection",
    );
    expect(screen.getByRole("link", { name: /contact the mirror operator/i })).toHaveAttribute(
      "href",
      "https://github.com/a113101007-dot",
    );
  });
});

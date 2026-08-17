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

    expect(screen.getByRole("heading", { name: /非官方镜像/ })).toBeInTheDocument();
    expect(screen.getByText(/以英文原文为准/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上游 GitHub 仓库/ })).toHaveAttribute(
      "href",
      "https://github.com/nomaan5541/motionsites-prompt-collection",
    );
    expect(screen.getByRole("link", { name: /联系镜像运营者/ })).toHaveAttribute(
      "href",
      "https://github.com/a113101007-dot",
    );
  });
});

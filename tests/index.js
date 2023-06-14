import React from "react";
import * as ElementChildren from "../src";

const Component = () => <span />;

describe("ElementChildren", () => {
  let children;

  beforeEach(() => {
    children = [
      <div key="div-1" />,
      false,
      0,
      ["string", null, <span key="span-1" />],
      [[<Component key="component-1" />]],
    ];
  });

  describe("forEach", () => {
    it("should skip non-element children", () => {
      const spy = jest.fn();

      ElementChildren.forEach(children, spy);

      expect(spy.mock.calls.length).toEqual(1);
    });

    it("should call with child and index", () => {
      const spy = jest.fn();

      ElementChildren.forEach(children, spy);

      expect(spy.mock.calls[0][0]).toEqual(children[0]);
      expect(spy.mock.calls[0][1]).toEqual(0);
    });
  });

  describe("count", () => {
    it("should count element children", () => {
      expect(ElementChildren.count(children)).toEqual(2);
    });
  });

  describe("map", () => {
    it("should map over element children", () => {
      const spy = jest.fn((child) => child);

      const result = ElementChildren.map(children, spy);

      expect(spy.mock.calls.length).toEqual(2);
      expect(result.length).toEqual(2);
    });
  });

  describe("filter", () => {
    it("should filter element children", () => {
      const spy = jest.fn((child) => child.type === "span");

      const result = ElementChildren.filter(children, spy);

      expect(result.length).toEqual(1);
      expect(result[0].type).toEqual("span");
    });
  });

  describe("some", () => {
    it("should match some element children", () => {
      const spy = jest.fn((child) => child.type === "div");

      const result = ElementChildren.some(children, spy);

      expect(result).toEqual(true);
    });
  });

  describe("every", () => {
    it("should match all element children", () => {
      const spy = jest.fn((child) => child.type === "div");

      expect(ElementChildren.every(children, spy)).toEqual(false);
      expect(ElementChildren.every([<div />, <div />], spy)).toEqual(true);
    });
  });

  describe("find", () => {
    it("should find element child", () => {
      const spy = jest.fn((child) => child.type === "div");

      const result = ElementChildren.find(children, spy);

      expect(result.type).toEqual("div");
    });
  });
});

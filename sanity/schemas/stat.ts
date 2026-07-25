import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Statistik Perusahaan",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label Statistik",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Nilai Angka",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix (misal: +, %, K)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Urutan",
      type: "number",
      initialValue: 0,
    }),
  ],
});

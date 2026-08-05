import { Settings } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const SettingsItem = (S: StructureBuilder) =>
  S.listItem()
    .title('Settings')
    .icon(Settings)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.divider(),
          S.listItem()
            .title('General')
            .child(
              S.document()
              .id('generalSettings')
              .schemaType('generalSettings')
              .documentId('generalSettings')
              .title('General')
            ),
          S.divider(),
          S.listItem()
            .title('Announcement Bar')
            .child(
              S.document()
                .id('announcementBarSettings')
                .schemaType('announcementBarSettings')
                .documentId('announcementBarSettings')
                .title('Announcement Bar')
            ),
          S.listItem()
            .title('Navigation')
            .child(
              S.document()
                .id('navigationSettings')
                .schemaType('navigationSettings')
                .documentId('navigationSettings')
                .title('Navigation')
            ),
          S.divider(),
          S.listItem()
            .title('Marketing')
            .child(
              S.document()
                .id('marketingSettings')
                .schemaType('marketingSettings')
                .documentId('marketingSettings')
                .title('Marketing')
            ),
          S.listItem()
            .title('Redirects')
            .child(
              S.documentList()
              .title('All Redirects')
              .filter('_type == "redirect"')
            ), 
          S.divider(),
          S.listItem()
            .title('Blog & Posts')
            .child(
              S.document()
                .id('blogSettings')
                .schemaType('blogSettings')
                .documentId('blogSettings')
                .title('Blog & Posts')
            ),
          S.divider(),
        ])
    )
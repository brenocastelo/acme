export const PageQuery = `
  query MyQuery($slug: String!) {
    page(where: { slug: $slug }) {
      sections {
        ... on Section {
          id
          blocks {
            ... on Callout {
              __typename
              id
              calloutbutton:actionButton {
                href
                id
                title
                size
              }
              title
              description
            }
            ... on FeatureSection {
              __typename
              id
              contentPosition
              featureButton: actionButton {
                href
                id
                size
                title
              }
              description
              label
              title
              media {
                __typename
                ... on Image {
                  id
                  altText
                  file {
                    id
                    url
                    height
                    width
                  }
                }
                __typename
                ... on EmbeddedVideo {
                  id
                  url
                }
              }
            }
            ... on Hero {
              __typename
              id
              title
              description
              actionButtons {
                id
                size
                title
                variant
              }
            }
          }
        }
      }
      seo {
        description
        id
        keywords
        noIndex
        title
        openGraphImage {
          url
          width
          id
        }
      }
    }
  }
`;

<template lang="pug">
  .page-footer(slot="page-footer")
    .page-footer__container
      .page-footer__column
        .page-footer__section
          .footer-title
            | {{ pageFooter.features.title }}

          .footer-title.footer-title--home
            | {{ pageFooter.homeLink.name }}

          ul.footer-list
            li(v-for="item in pageFooter.features.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

      .page-footer__column
        .page-footer__section
          .footer-title
            | {{ pageFooter.formsLibrary.title }}

          ul.footer-list
            li(v-for="item in pageFooter.formsLibrary.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

        .page-footer__section
          .footer-title
            | {{ pageFooter.onlineAndMobileApp.title }}

          ul.footer-list
            li(v-for="item in pageFooter.onlineAndMobileApp.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

      .page-footer__column
        .page-footer__section
          .footer-title
            | {{ pageFooter.functions.title }}

          ul.footer-list
            li(v-for="item in pageFooter.functions.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

        .page-footer__section
          .footer-title
            | {{ pageFooter.comparison.title }}

          ul.footer-list
            li(v-for="item in pageFooter.comparison.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

        .page-footer__section
          .footer-title
            | {{ pageFooter.integrations.title }}

          ul.footer-list
            li(v-for="item in pageFooter.integrations.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

      .page-footer__column
        .page-footer__section
          .footer-title
            | {{ pageFooter.support.title }}

          ul.footer-list
            li(v-for="item in pageFooter.support.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

        .page-footer__section
          .footer-title
            | {{ pageFooter.business.title }}

          ul.footer-list
            li(v-for="item in pageFooter.business.list").footer-list__item
              a(:href="item.url").footer-list__link
                | {{ item.text }}

      .page-footer__column
        .page-footer__section
          .footer-title
            | {{ pageFooter.socials.title }}

          .footer-list
            .footer-list__item
              a.twitter-share-button(href='https://twitter.com/share', data-url='http://www.pdffiller.com', data-text='Loving @PDF_filler, edit and sign any document or PDF online or on any device.')
                | Tweet


            .footer-list__item
              iframe(src='https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FPDFfiller%2F111364995554310&send=false&layout=button_count&width=450&show_faces=true&action=like&colorscheme=light&font=verdana&height=21&appId=3188705211&locale=en_US', scrolling='no', frameborder='0', style='border:none; overflow:hidden; width:130px; height:21px;', allowtransparency='true')

        .page-footer__section
          .page-footer__copyright
            p {{ pageFooter.copyright.since }}

            p {{ pageFooter.copyright.textReserved }}

</template>

<script>
export default {
  name: 'PageFooter',
  beforeCreate () {
    // Twitter button
    !function(d,s,id){let js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  },
  data () {
    return {
      pageFooter: {
        homeLink: {
          name: 'PDFfiller',
          icon: true
        },
        features: {
          title: 'Features',
          list: [
            {
              text: 'About Us',
              url: '/en/about.htm'
            },
            {
              text: 'Blog',
              url: 'http://blog.pdffiller.com'
            },
            {
              text: 'Career',
              url: '/en/career.htm'
            },
            {
              text: 'Customer Stories',
              url: '/en/customer_stories'
            },
            {
              text: 'Contact Us',
              url: '/en/support.htm'
            },
            {
              text: 'Terms of Service',
              url: '/en/terms_of_services.htm'
            },
            {
              text: 'PrivacyPolicy',
              url: '/en/privacy_policy.htm'
            },
            {
              text: 'API',
              url: '/en/api.htm'
            },
            {
              text: 'Guides',
              url: '/en/content/guidebook.htm'
            },
            {
              text: 'User Reviews',
              url: '/en/shopperapproved.htm'
            }
          ]
        },
        formsLibrary: {
          title: 'Forms Library',
          titleUrl: '/en/forms_category',
          list: [
            {
              text: 'Top 100 Forms',
              url: '/en/top.htm'
            },
            {
              text: 'PDF Search Engine',
              url: '/en/fillable-pdf-forms-search-engine.htm'
            },
            {
              text: 'A-Z Listing of Forms',
              url: '/en/alphabetical/1/1.htm'
            },
            {
              text: 'Forms Catalog',
              url: '/en/catalog'
            },
            {
              text: 'Irs Tax Forms',
              url: '/en/us-federal-tax-forms-irs'
            },
            {
              groupedItems: [
                [{
                  text: 'W2',
                  url: 'https://fillable-form-w2.pdffiller.com/'
                },
                {
                  text: 'W9',
                  url: 'https://w9.pdffiller.com',
                  inline: true
                },
                {
                  text: '1099-MISC',
                  url: 'https://1099-form.pdffiller.com/',
                  inline: true
                }]
              ]
            },
            {
              groupedItems: [
                [{
                  text: 'DS11',
                  url: 'https://ds11.pdffiller.com/'
                },
                {
                  text: 'DS82',
                  url: 'https://ds82.pdffiller.com/'
                },
                {
                  text: '1096',
                  url: 'https://form-1096.pdffiller.com/'
                }]
              ]
            }
          ]
        },
        onlineAndMobileApp: {
          title: 'Online & Mobile App',
          list: [{
            text: 'Google Application',
            url: '/en/categories/google-apps.htm'
          },
            {
            text: 'iOS Application',
            url: '/en/functionality/go_to_app_store'
          }]
        },
        functions: {
          title: 'Functions',
          titleUrl: '/en/categories',
          list: [{
            text: 'Edit PDFs Online',
            url: 'https://edit-pdf.pdffiller.com'
          },
            {
            text: 'LinkToFill',
            url: '/en/categories/link-to-fill-online-tool.htm'
          },
            {
            text: 'SendToSign',
            url: '/en/functionality/sendtosign.htm'
          }]
        },
        comparison: {
          title: 'Comparison',
          titleUrl: '/en/categories',
          list: [{
            text: 'Adobe Acrobat Alternative',
            url: '/en/competitor/adobe-acrobat-pro-competitor-alternative-similar-website-edit-pdf-form-document-online-editor-tool'
          },
            {
            text: 'DOCSTOC ALTERNATIVE',
            url: '/en/competitor/docstoc.htm'
          }]
        },
        integrations: {
          title: 'Integrations',
          list: [{
            text: 'Salesforce',
            url: '/en/integrations/salesforce'
          }]
        },
        support: {
          title: 'Support',
          list: [{
            text: 'Community',
            url: '/en/community'
          },
          {
            text: 'FAQ',
            url: '/en/support/edit-modify-pdf-documents-online.htm'
          },
          {
            text: 'Tutorial Videos',
            url: '/en/video-tutorials.htm?v=header'
          },
          {
            text: 'Pricing',
            url: '/en/services.htm'
          }]
        },
        business: {
          title: 'For Business',
          titleUrl: '/en/industry.htm',
          list: [{
            text: 'Insurance',
            url: '/en/industry/insurance'
          },
          {
            text: 'Medical',
            url: '/en/industry/medical'
          },
          {
            text: 'Real Estate',
            url: '/en/industry/real-estate'
          },
          {
            text: 'Human Resources',
            url: '/en/industry/human-resources'
          }]
        },
        socials: {
          title: 'Follow Us'
        },
        copyright: {
          since: '© 2006-2017 PDFfiller Inc.',
          textReserved: 'All rights reserved'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/scss/_helpers";

  .page-footer {
    padding: 30px 0 34px;
    color: $footer-text-color;
    background: $footer-bg;
  }

  .page-footer__container {
    @extend %container;
  }

  .page-footer__column {
    width: 20%;
    padding-right: 2.5%;
    float: left;
    &:last-child {
      padding-right: 0;
    }
  }

  .page-footer__section {
    margin-bottom: 15px;
    .page-footer__column & {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .footer-title {
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: $bold;
    color: $reverse-color;
  }

  .footer-list {
    margin: 0;
    padding: 0;
  }

  .footer-list__item {
    margin: 0;
    font-size: 10px;
    text-transform: uppercase;
    list-style: none;
  }

  .footer-list__link {
    display: inline-block;
    line-height: 2;
    color: $footer-text-color;
    &:hover,
    &:active {
      color: $reverse-color;
    }
  }

  .page-footer__copyright {
    font-size: 0.78571em;
    line-height: 1.7;
    p {
      margin: 0;
    }
  }
</style>

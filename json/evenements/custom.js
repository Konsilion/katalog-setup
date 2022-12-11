{
  "fields": [
    {
      "name": "n_ref",
      "title": "Identifiant",
      "description": "Identifiant unique",
      "locked": true
    },
    {
      "name": "nom",
      "sticky": true,
      "primaryKey": true
    },
    {
      "name": "siren"
    },
    {
      "name": "adresse",
      "subtype": "longtext",
      "maxLength": 15
    },
    {
      "name": "adresse_full",
      "subtype": "longtext",
      "maxLength": 15
    },
    {
      "name": "departement",
      "subtype": "tag",
      "foreignKey": {
        "activate": true,
        "ressource": "https://github.com/multi-coop/gitribute-content-test/blob/main/data/csv/odf/ODF-Observatoire-departements-regions.csv",
        "ressourceOptions": {
          "separator": ","
        },
        "fields": "depcode",
        "returnFields" : [
          "Département",
          "région"
        ]
      }
    },
    {
      "name": "statut_infos",
      "hide": true
    },
    {
      "name": "lat",
      "hide": true
    },
    {
      "name": "lon",
      "hide": true
    },
    {
      "name": "nature_juridique",
      "title": "Nature juridique",
      "subtype": "tag"
    },
    {
      "name": "type_lieu",
      "title": "Type de lieu",
      "subtype": "tag"
    },
    {
      "name": "code_label",
      "subtype": "tag",
      "bgColor" : "red"
    },
    {
      "name": "codes_types_mediations",
      "subtype": "tags",
      "allowNew": true,
      "tagSeparator": "-",
      "bgColor" : "#BED3C3"
    },
    {
      "name": "codes_publics",
      "subtype": "tags",
      "allowNew": true,
      "tagSeparator": "-",
      "bgColor" : "#BED3C3"
    },
    {
      "name": "codes_thematiques",
      "subtype": "tags",
      "allowNew": true,
      "tagSeparator": "-",
      "bgColor" : "orange"
    },
    {
      "name": "merge",
      "subtype": "tags",
      "tagSeparator": "+"
    },
    {
      "name": "orga",
      "subtype": "tag",
      "allowNew": true,
      "bgColor" : "#F0BE86"
    },
    {
      "name": "platform_clean",
      "subtype": "tag"
    },
    {
      "name": "depcode",
      "subtype": "tag"
    },
    {
      "name": "reg_code_geo",
      "subtype": "tag"
    },
    {
      "name": "reg_code_short",
      "subtype": "tag"
    },
    {
      "name": "email_structure",
      "subtype": "email"
    },
    {
      "name": "site_internet",
      "subtype": "link"
    }
  ],
  "consolidation": [
    {
      "api_name": "api-entreprise",
      "source_fields": [
        { "name": "siren" }
      ],
      "activate": true,
      "api": "https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/{{siren}}",
      "results_fields": [
        {
          "resp_field": "unite_legale.etablissement_siege.latitude",
          "map_to_field": "lat"
        },
        {
          "resp_field": "unite_legale.etablissement_siege.longitude",
          "map_to_field": "lon"
        },
        {
          "resp_field": "unite_legale.etablissement_siege.geo_adresse",
          "map_to_field": "adress"
        },
        {
          "resp_field": "unite_legale.etablissement_siege.code_postal",
          "map_to_field": "depcode"
        }
      ]
    },
    {
      "api_name": "adresse.gouv.fr",
      "source_fields": [
        { "name": "adress" }
      ],
      "activate": true,
      "api": "https://api-adresse.data.gouv.fr/search/?q={{adress}}",
      "results_fields": [
        { 
          "resp_field" : "features.0.geometry.coordinates.1",
          "map_to_field": "lat"
        },
        { 
          "resp_field" : "features.0.geometry.coordinates.0",
          "map_to_field": "lon"
        }
      ]
    }
  ],
  "validation": [
    {
      "api_name": "api-json-validation",
      "api": "https://json.validator.validata.fr/validate",
      "api_doc": "https://json.validator.validata.fr/apidocs",
      "notes": "not implemented (yet)"
    }
  ]
}

import {GroupModel} from "../group/group-model";

export interface StudentModel {
  "_links": [
    {
      "deprecation": string,
      "href": string,
      "hreflang": string,
      "media": string,
      "rel": string,
      "templated": boolean,
      "title": string,
      "type": string
    }
  ],
  "firstname": string,
  "id": number,
  "lastname": string,
  group: GroupModel | null
}

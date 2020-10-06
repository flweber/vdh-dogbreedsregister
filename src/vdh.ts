import { AllHtmlEntities as Entities } from "html-entities";
import _ from "lodash";
import axios from "axios";

type HTTPProtocols = "http" | "https";

export default class VDH {
  private protocol: HTTPProtocols;
  private url: string;
  private path: string;
  private limit: number;
  private entities: Entities;
  breeds: string[];

  constructor(protocol: HTTPProtocols = "https", url = "www.vdh.de", path = "/welpen/rasse", limit = 10000) {
    this.protocol = protocol;
    this.url = url;
    this.path = path;
    this.limit = limit;
    this.breeds = [];
    this.entities = new Entities();
  }

  private async requestBreeds(letter: string): Promise<string> {
    const { data } = await axios.get(`${this.protocol}://${this.url + this.path}?q=${letter}&limit=${this.limit}`);
    return data;
  }

  private async parseBreeds(html: string): Promise<string[]> {
    const headLineRegex = new RegExp(/<h3>.*<\/h3>/g);
    const filterSpanHeadlines = new RegExp(/.*<span.*/g);
    let breeds: string[] = [];
    breeds = html.match(headLineRegex) || [];
    breeds = _.filter(breeds, o => {
      return !filterSpanHeadlines.test(o);
    });
    _.forEach(breeds, (o, index) => {
      breeds[index] = this.entities.decode(o.replace("<h3>", "").replace("</h3>", "").replace(/.\(.*\)/g, ""));
    });
    breeds = _.uniq(breeds);
    return breeds;
  }

  async getBreeds(refresh = false): Promise<string[]> {
    const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (refresh || this.breeds.length <= 0) {
      for (let i = 0; i < ALPHABET.length; i++) {
        const breeds = await this.requestBreeds(ALPHABET[i]);
        this.breeds = this.breeds.concat(await this.parseBreeds(breeds));
      }
      return this.breeds;
    }
    return this.breeds;
  }
}

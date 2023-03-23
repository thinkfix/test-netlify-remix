export default function Footer() {
    return (
      <footer className={"bg-white px-10 py-14"}>
          <div className={"text-2xl lg:text-4xl leading-8 lg:leading-12 tracking-tighter"}>
              Vi har kontorer i Oslo og Ukraina.<br/>
              Ring oss på <a className={"underline"} href="tel:+4722343234">+47 22 34 32 34</a><br/>
              eller send en mail til <a className={"underline"} href="mailto:hei@tinyelephant.no">hei@tinyelephant.no</a>.<br/>
              Besøk oss gjerne på <a className={"underline"} href="https://www.facebook.com/tinyelephantno" target="_blank">Facebook</a> og <a className={"underline"} href="https://www.linkedin.com/company/9465313/" target="_blank">LinkedIn</a><br/>
              Vi snakkes!
          </div>
          <ul className={"flex pt-10"}>
              <li className={"pr-10"}><a href="https://solutionpartners.adobe.com/s/directory/detail/tiny+elephant" target="_blank" className={"underline"}>Magneto Solution Partners</a></li>
              <li><a href="https://goo.gl/maps/xog3hF4ssRR7xuMk8" target="_blank" className={"underline"}>Frydenbergveien 46B, 0575 N-Oslo</a></li>
          </ul>

      </footer>
    );
}
import { ReactNode } from "react"

const brags: Array<ReactNode> = [
  <p key="1">Once, I rode a motorbike through a typhoon for about 2.5 hours.</p>,
  <p key="2">
    Arguably the most boring week of my life was when I was stuck on the
    Trans-Siberian train for a week with Kirkegaard e-books.
  </p>,
  <p key="3">
    I was pretty drunk on the profile photo{" "}
    <span className="hidden md:inline">on the left</span>
    <span className="md:hidden">above</span>.
  </p>,
  <p key="4">
    I learned basic HTML, CSS, Javascript, PHP and jQuery in about three month,
    during which I spent around 16-18 hours a day on projects and learning, practically locked in my room.
  </p>,
  <p key="5">
    I lived in 8 countries, and visited more than 30. There are more than 25
    addresses where I lived for 3+ months.
  </p>,
  <p key="6">Drove through Europe with a left hand drive car. Twice.</p>,
  <p key="7">I eat peanut butter almost every day.</p>,
  <p key="8">
    After many years of not-so-goal-oriented practice, I can hold a handstand for
    about 20 seconds on a good day.
  </p>,
  <p key="8">
    I{"'"}ve played more than 14.000 online chess games since January of 2022.
    Yes, I know that{"'"}s when Queen{"'"}s Gambit came out. No, I haven{"'"}t
    gotten good at it.
  </p>,
  <p key="9">I can juggle with 3 medium sized, round shaped objects. </p>,
  <p key="10">I have a stamp in my passport from the Myanmar border control. I have never been to Myanmar.</p>,
  <p key="11">Controversy alert. I love pineapples. I love pizza. Now, I{"'"}m not a radical extremist when it comes to this question, I love the combination occasionally, but only on a thin crust. I guess that leaves the sourdough sacred for all ya fanatics.</p>,
]

export const FunFacts = () => {
  return (
    <div>
      <p className="mb-8 p-4">
        This is the part where I get to arbitrarily brag about random shit.
        After all, this is my website.
      </p>
      <ol>
        {brags.map((item, i) => (
          <li key={i} className="odd:bg-muted px-4 py-2">
            <div className="flex gap-2">
              <span>{i + 1}.</span>
              {item}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

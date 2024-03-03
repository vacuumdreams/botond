import "css-doodle";

export const Doodle = () => {
  return (
    <css-doodle style={{ position: "absolute", top: 0, zIndex: -1 }}>
      <style>
        {`
      @grid: 75x1 / 100vmax;
      :container {
        perspective: 23vmin;
      }
      background: @m(
        @r(200, 240),
        radial-gradient(
          @p(#fff) 10%,
          transparent 50%
        ) @r(100%) @r(100%) / @r(1%, 0%) @lr no-repeat
      );

      @size: 100%;
      @place-cell: center;

      border-radius: 50%;
      transform-style: preserve-3d;
      animation: scale-up 30s linear infinite;
      animation-delay: calc(@i * -.4s);

      @keyframes scale-up {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) rotate(0);
        }
        10% {
          opacity: 1;
        }
        95% {
          transform:
            translate3d(0, 0, @r(50vmin, 55vmin))
            rotate(@r(-360deg, 360deg));
        }
        100% {
          opacity: 0;
          transform: translate3d(0, 0, 1vmin);
        }
      }
      `}
      </style>
    </css-doodle>
  );
};

      {/* <TransitionGroup>
        <CSSTransition
          key={pathname}
          classNames="page"
          timeout={{
            enter: 5000,
            exit: 20000
          }}
        >
          <Route
            location={location}
            render={() => (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route component={Error404} />
              </Switch>
            )}
          />
        </CSSTransition>
      </TransitionGroup> */}


      // .page {
//   height: 100vh;
//   padding: calc(15% + 1.5em) 5% 5%;
//   overflow-y: auto;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   -webkit-overflow-scrolling: touch;
//   transition: transform 1s ease-in-out, box-shadow 1s ease-in-out;
// }

// .page-enter {
//   transform: translate(-100%, 0);
// }

// .page-enter-active {
//   transform: translate(0, 0);
// }

// .page-exit {
//   box-shadow: 0 0 5em 0 rgba(0, 0, 0, .5) inset;
//   transform: translate(-100%, 0);
// }

// .page--prev.page-enter {
//   transform: translate(100%, 0);
// }

// .page--prev.page-enter-active {
//   transform: translate(0, 0);
// }

// .page--prev.page-exit {
//   transform: translate(100%, 0);
// }

// .page-exit .page__inner {
//   opacity: 0;
//   transform: scale(0.9);
//   transition: transform 1s ease-in-out, opacity 1s ease-in-out;
// }

// .page h1 {
//   margin-top: 0;
// }
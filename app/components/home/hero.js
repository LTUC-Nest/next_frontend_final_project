export default function Hero() {
  return (
      <div className="animate__animated animate__bounceInUp relative isolate overflow-hidden bg-bg-light dark:bg-bg-dark py-60 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/RealEstateBG.png')" }}>
          <div className="absolute top-0 left-0 p-6">
              <div className="mx-auto max-w-7xl">
                  <div className="max-w-2xl">
                      <h2 className="text-4xl font-bold tracking-tight text-text-dark dark:text-text-light sm:text-6xl">
                          Elevate Your Property Management
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-text-dark dark:text-text-light">
                          Enhance your property management and rental process with our expertise. We offer dedicated service and innovative solutions to meet all your real estate needs.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}

<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <notification-landing-page />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">
          Découvrez des contenus inspirants et uniques
        </h1>
        <p class="text-center">
          Découvrez les histoires inspirantes de créateurs d’exception.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <v-img src="/images/illustration.png" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">Rejoignez une communauté</h2>
        <p class="text-center">
          Ne soyez pas seul, partagez avec d’autres, autour d’une même passion
          qui vous anime.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">Soyez plus qu’un simple fan</h2>
        <p class="text-center">
          Nouez un contact privilégier avec les personnes que vous suivez.
        </p>
        <p class="text-center">
          Demandez enfin du contenu unique et exclusif auprès des célébrités que
          vous suivez.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">Soyez un VIP</h2>
        <p class="text-center">
          Choisissez votre nom aujourd’hui ! <br />
          <strong>
            <i>(avant qu’il ne soit pris par quelqu’un d’autre)</i>
          </strong>
        </p>
        <p class="text-center">
          Ainsi, quand l’application Stories.fans sortira, nous vous aurons
          reserver une place en mode VIP.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <form-landing-page />
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">
          Vous avez une passion et souhaitez en vivre ?
        </h2>
        <p class="text-center mb-5">
          Que vous ayez une communauté ou non, découvrez que ce que Stories.fans
          peu vous offir…
        </p>
        <v-btn color="#FC57D2" dark block link :to="{ name: 'index' }">
          En savoir plus
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

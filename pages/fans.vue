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
          {{ $t('landing.fans.title-1') }}
        </h1>
        <p class="text-center">
          {{ $t('landing.fans.content-1') }}
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
        <h2 class="text-center pb-3">{{ $t('landing.fans.title-2') }}</h2>
        <p class="text-center">
          {{ $t('landing.fans.content-2') }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-10">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">{{ $t('landing.fans.title-3') }}</h2>
        <p class="text-center">
          {{ $t('landing.fans.content-3-1') }}
        </p>
        <p class="text-center">
          {{ $t('landing.fans.content-3-2') }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h2 class="text-center pb-3">
          {{ $t('landing.fans.title-4') }}
        </h2>
        <p class="text-center">
          {{ $t('landing.fans.content-4-1') }} <br />
          <strong>
            <i>{{ $t('landing.fans.content-4-2') }}</i>
          </strong>
        </p>
        <p class="text-center">
          {{ $t('landing.fans.content-4-3') }}
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
          {{ $t('landing.fans.title-5') }}
        </h2>
        <p class="text-center mb-5">
          {{ $t('landing.fans.content-5') }}
        </p>
        <v-btn color="#FC57D2" dark block link :to="{ name: 'index' }">
          {{ $t('landing.fans.button-5') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

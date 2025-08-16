<template>
    <div class="landing-busqueda pt-5">

        <!-- // imagen centrada -->
        <div class="img-landing-busqueda pt-5">
            <img @click="onClear()" src="@/assets/img/logos/logo-full.png" alt="Logo"
                class="cursor-pointer logo-busqueda" />
        </div>


        <div class="search-container mt-3">
            <div class="search-box">
                <AutoComplete v-model="filter.GLOBAL" :suggestions="dataComplete" @complete="searchSugges"
                    optionLabel="DESCP" class="search-input"
                    placeholder="Busca por nombre de caso, palabra clave ó selecciona los filtros"
                    @keydown.enter="search">
                    <template #option="slotProps">
                        <div class="d-flex align-items-center gap-2">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.99992 4.83301H8.00525M7.99992 10.1663V6.83301M14.6666 7.49967C14.6666 11.1817 11.6819 14.1663 7.99992 14.1663C4.31792 14.1663 1.33325 11.1817 1.33325 7.49967C1.33325 3.81767 4.31792 0.833008 7.99992 0.833008C11.6819 0.833008 14.6666 3.81767 14.6666 7.49967Z"
                                    stroke="#5E5E5C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <span>{{ slotProps.option.DESCP }}</span>
                        </div>
                    </template>
                </AutoComplete>

                <!-- Botón para limpiar -->
                <button v-if="filter.GLOBAL" @click="filter.GLOBAL = null" class="btn-clear">
                    <img src="@/assets/img/icons/close.svg" alt="Close" />
                </button>

                <!-- Separador -->
                <div class="separator"></div>

                <!-- Icono de filtro -->
                <div v-if="['2', '3', '4'].includes(role.IDPLN)">
                    <button class="btn-filter" @click="isCollapsed = !isCollapsed">
                        <img src="@/assets/img/icons/filter.svg" alt="Filter" />
                    </button>
                    <div id="filterbar-container" v-show="!isCollapsed" ref="filterMenu">
                        <div class="filter">
                            <div class="filter-header">
                                <div class="flex mb-1 gap-1 flex-row contenedor-tab">
                                    <img class="container-nav" src="@/assets/img/icons/corona.svg" alt="Close" />
                                    <p class="container-nav"
                                        @click="typeSaarch = 'jurisprudences'; isFilter = 'jurisprudences-generales'; criterioActual = 'year-publication'"
                                        :class="typeSaarch == 'jurisprudences' ? 'active-criterio' : ''">
                                        Jurisprudencia
                                    </p>
                                </div>
                                <ul>
                                    <li class="container-nav"
                                        @click="isFilter = 'jurisprudences-generales'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-generales' ? 'active-criterio' : ''">
                                        Criterios Generales
                                    </li>
                                    <li class="container-nav"
                                        @click="isFilter = 'jurisprudences-compliance'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-compliance' ? 'active-criterio' : ''">
                                        Compliance</li>
                                    <li class="container-nav"
                                        @click="isFilter = 'jurisprudences-extincion'; criterioActual = 'year-publication', typeSaarch = 'jurisprudences'"
                                        :class="isFilter == 'jurisprudences-extincion' ? 'active-criterio' : ''">
                                        Extinción de Dominio
                                    </li>
                                </ul>
                                <div class="mt-2 flex mb-1 gap-1 flex-row contenedor-tab">
                                    <img class="container-nav" src="@/assets/img/icons/settings.svg" alt="Close" />
                                    <p class="container-nav"
                                        @click="typeSaarch = 'legislations'; isFilter = 'legislaciones-generales'; criterioActual = 'year-publication'"
                                        :class="typeSaarch == 'legislations' ? 'active-criterio' : ''">
                                        Legislación
                                    </p>
                                </div>
                                <ul>
                                    <li class="container-nav"
                                        @click="isFilter = 'legislaciones-generales', criterioActual = 'year-publication', typeSaarch = 'legislations'"
                                        :class="isFilter == 'legislaciones-generales' ? 'active-criterio' : ''">
                                        Criterios Generales</li>
                                </ul>
                            </div>
                            <div class="contenedor-filtros">
                                <div class="row-contenedor"
                                    style="position: relative; overflow-x: auto; white-space: nowrap; padding: 0 1rem;">
                                    <!-- Botón izquierda -->
                                    <button @click="scrollLeft"
                                        style="position: absolute; left: 0; top: 45%; transform: translateY(-50%); z-index: 10; padding: 0.5rem; background-color: white;">
                                        ◀
                                    </button>
                                    <div ref="scrollContainer" class="no-scroll"
                                        style="scroll-behavior: smooth;overflow-x: auto; white-space: nowrap;">
                                        <div class="contenedor-cabeceras-a flex flex-row contenedor-tab">
                                            <a class="cursor-pointer"
                                                v-if="['legislaciones-generales', 'jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter)"
                                                @click="criterioActual = 'year-publication'"
                                                :class="criterioActual === 'year-publication' ? 'active-tab' : ''">
                                                Año de Publicación
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'delito'"
                                                :class="criterioActual === 'delito' ? 'active-tab' : ''">
                                                Delito
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'recurso'"
                                                :class="criterioActual === 'recurso' ? 'active-tab' : ''">
                                                Recurso
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'organos'"
                                                :class="criterioActual === 'organos' ? 'active-tab' : ''">
                                                Órgano Jurisdiccional
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'magistrados'"
                                                :class="criterioActual === 'magistrados' ? 'active-tab' : ''">
                                                Magistrado
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'jvinculante'"
                                                :class="criterioActual === 'jvinculante' ? 'active-tab' : ''">
                                                Jurisprudencia Vinculante
                                            </a>
                                            <a v-if="['jurisprudences-generales'].includes(isFilter)"
                                                @click="criterioActual = 'cemblematico'"
                                                :class="criterioActual === 'cemblematico' ? 'active-tab' : ''">
                                                Caso Emblemático
                                            </a>
                                            <a v-if="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter)"
                                                @click="criterioActual = 'keywords'"
                                                :class="criterioActual === 'keywords' ? 'active-tab' : ''">
                                                Palabras Clave
                                            </a>
                                            <!-- <a v-if="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter)"
                                                @click="criterioActual = 'tema'"
                                                :class="criterioActual === 'tema' ? 'active-tab' : ''">
                                                Tema
                                            </a>
                                            <a v-if="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter)"
                                                @click="criterioActual = 'subtema'"
                                                :class="criterioActual === 'subtema' ? 'active-tab' : ''">
                                                Subtema
                                            </a> -->
                                            <a v-if="['jurisprudences-compliance'].includes(isFilter)"
                                                class="cursor-pointer" @click="criterioActual = 'materia'"
                                                :class="criterioActual === 'materia' ? 'active-tab' : ''">
                                                Materia
                                            </a>
                                            <a v-if="['jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter)"
                                                class="cursor-pointer" @click="criterioActual = 'jurisdiccion'"
                                                :class="criterioActual === 'jurisdiccion' ? 'active-tab' : ''">
                                                Jurisdicción
                                            </a>

                                            <!-- // parte 2 -->
                                            <a v-if="['legislaciones-generales'].includes(isFilter)"
                                                class="cursor-pointer" @click="criterioActual = 'numeracion'"
                                                :class="criterioActual === 'numeracion' ? 'active-tab' : ''">
                                                Numeración
                                            </a>
                                            <a v-if="['legislaciones-generales'].includes(isFilter)"
                                                @click="criterioActual = 'tnorma'" class="cursor-pointer"
                                                :class="criterioActual === 'tnorma' ? 'active-tab' : ''">
                                                Tipo de Norma
                                            </a>
                                            <a v-if="['legislaciones-generales'].includes(isFilter)"
                                                class="cursor-pointer" @click="criterioActual = 'oemisor'"
                                                :class="criterioActual === 'oemisor' ? 'active-tab' : ''">
                                                Órgano Emisor
                                            </a>
                                        </div>
                                    </div>
                                    <!-- Botón derecha -->
                                    <button @click="scrollRight"
                                        style="position: absolute; right: 0; top: 45%; transform: translateY(-50%); z-index: 10; padding: 0.5rem; background-color: white;">
                                        ▶
                                    </button>
                                </div>
                                <div class="row">
                                    <div class="px-3"
                                        :class="['legislaciones-generales', 'jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'year-publication' ? 'col-12 row' : 'd-none'">
                                        <div class="col-12 col-md-6 mb-3 px-1">
                                            <label for="FRESOLUTION1" class="form-label">Fecha de Inicio</label>
                                            <date-picker v-model="filter.FRESOLUTION1" value-type="format" type="year"
                                                @change="filter.FRESOLUTION1 = $event" :value="filter.FRESOLUTION1"
                                                appendTo="self" panelClass="force-open-down">
                                            </date-picker>
                                        </div>
                                        <div class="col-12 col-md-6 mb-3 px-1">
                                            <label for="FRESOLUTION2" class="form-label">Fecha de Fin</label>
                                            <date-picker v-model="filter.FRESOLUTION2" value-type="format" type="year"
                                                @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2"
                                                appendTo="self" panelClass="force-open-down">
                                            </date-picker>
                                        </div>
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'delito' ? 'col-12' : 'd-none'">

                                        <el-tree-select v-model="filter.DELITO" :data="selects['DELITOS']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />

                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'recurso' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.RECURSO" :data="selects['TIPO DE RECURSO']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'organos' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.OJURISDICCIONAL"
                                            :data="selects['ÓRGANO JURISDICCIONAL']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'magistrados' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.MAGISTRATES" :data="selects['MAGISTRATES']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'jvinculante' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.JVINCULANTE"
                                            :data="selects['JURISPRUDENCIA VINCULANTE']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />

                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales'].includes(isFilter) && criterioActual === 'cemblematico' ? 'col-12' : 'd-none'">
                                        <div class="switch-container">
                                            <label for="BLOG" class="switch-label">Casos Emblemáticos</label>
                                            <label class="switch">
                                                <input type="checkbox" id="BLOG" v-model="filter.BLOG">
                                                <span class="slider"></span>
                                            </label>

                                            <div class="d-inline-block position-relative">
                                                <img src="@/assets/img/icons/interrogation.svg" alt="Switch"
                                                    class="cursor-pointer info-icon" v-b-tooltip.hover
                                                    title="Genera alarma social por su alta significancia criminal." />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'keywords' ? 'col-12' : 'd-none'">
                                        <b-form-tags separator="," v-model="filter.KEYWORDS" tag-variant="primary"
                                            tag-pills tag-readonly tag-class="bg-app-secondary-b text-app-primary-b"
                                            tag-size="sm" placeholder="Agregar una palabra clave"
                                            addButtonText="Agregar" removeButtonText="Eliminar" removeOnDeleteKey />
                                    </div>

                                    <!-- <div class="px-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'tema' ? 'col-12' : 'd-none'">
                                        <input type="text" v-model="filter.TEMA" id="TEMA" class="form-control" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'subtema' ? 'col-12' : 'd-none'">
                                        <input type="text" v-model="filter.SUBTEMA" id="SUBTEMA" class="form-control" />
                                    </div> -->

                                    <div class="px-3"
                                        :class="['legislaciones-generales'].includes(isFilter) && criterioActual === 'numeracion' ? 'col-12' : 'd-none'">
                                        <input type="text" v-model="filter.NMRCN" id="NMRCN" class="form-control" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-compliance'].includes(isFilter) && criterioActual === 'materia' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.MATERIA" :data="selects['MATERIA']" multiple
                                            :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['jurisprudences-generales', 'jurisprudences-compliance', 'jurisprudences-extincion'].includes(isFilter) && criterioActual === 'jurisdiccion' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.JURISDICCION" :data="selects['JURISDICCIÓN']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['legislaciones-generales'].includes(isFilter) && criterioActual === 'tnorma' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.TPONRMA" :data="selects['TIPO DE NORMA']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                    <div class="px-3"
                                        :class="['legislaciones-generales'].includes(isFilter) && criterioActual === 'oemisor' ? 'col-12' : 'd-none'">
                                        <el-tree-select v-model="filter.OEMISOR" :data="selects['ÓRGANO EMISOR']"
                                            multiple :render-after-expand="false" placeholder="Seleccione una opción"
                                            show-checkbox check-strictly check-on-click-node filterable clearable
                                            collapse-tags :max-collapse-tags="1"
                                            no-data-text="No hay opciones disponibles" popper-append-to-body
                                            class="custom-tree-select" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón de búsqueda -->
            <button class="btn-search" type="button" id="filter-btn" @click="search">
                Realizar búsqueda
            </button>
        </div>

        <div class="top-search-container">
            <Carousel :breakpoints="carouselConfig.breakpoints" :wrap-around="carouselConfig.wrapAround"
                :autoplay="false" :settings="{ navigationEnabled: true }">
                <Slide class="p-2 mb-5" v-for="(valor, index) in topSearch" :key="valor.DESCP + '-' + index">

                    <div class="top-search-chip" @click="filter.GLOBAL = valor.DESCP; search()">
                        <div class="d-flex align-items-center gap-2">
                            <span>{{ valor.DESCP }}</span>
                        </div>
                    </div>
                </Slide>



                <template #addons>
                    <Pagination />
                </template>
            </Carousel>
        </div>



        <div v-if="resultados.length > 0" class="search-results">
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <div v-for="(item, index) in resultados" :key="index" class="result-item">
                <!-- Título con flecha -->
                <div class="result-title" @click="openModalWithData(item)">
                    <span>{{ item.TITULO }}</span>
                </div>

                <div v-if="item.TYPE == 'jurisprudences'" class="row">
                    <!-- Pretensión / Delito -->
                    <p class="result-info px-2 py-1 px-2 py-1 col-12 col-md-4">
                        <strong>Pretensión / Delito:</strong><br>{{item.DELITO?.length > 0 ? item.DELITO?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Tipo de Recurso:</strong> <br>{{item.RECURSO?.length > 0 ? item.RECURSO?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Órgano Jurisdiccional:</strong> <br>{{item.OJURISDICCIONAL?.length > 0 ?
                            item.OJURISDICCIONAL?.map(o => o.DESCP).join(', ') : '-'}}
                    </p>
                    <!-- <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Jurisprudencia Vinculante:</strong> {{item.DELITO.map((delito) => delito.DESCP).join(', ')}}
                    </p> -->
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Caso Emblemático:</strong> <br>{{ item?.TYPE == "jurisprudences" ?
                            (item?.CASO || "-") : (item?.RTITLE || '-') }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Caso Vinculante:</strong> <br>{{ item.INDICADOR ? 'Sí' : 'No' }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Palabras Clave:</strong> <br>{{item.KEYWORDS?.split(',').map(p => p.trim()).join(', ')}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-12">
                        <strong>Síntesis:</strong> <br>{{ item.SHORTSUMMARY3 }}
                    </p>

                </div>

                <div v-if="item.TYPE == 'legislations'" class="row">
                    <!-- Pretensión / Delito -->
                    <p class="result-info px-2 py-1 px-2 py-1 col-12 col-md-3">
                        <strong>Numeración:</strong><br>{{ item.NMRCN }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Fecha de publicación:</strong> <br>{{ formateReverse(item.FRESOLUTION) }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Órgano emisor:</strong> <br>{{item.OEMISOR?.length > 0 ? item.OEMISOR?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-3">
                        <strong>Estado:</strong> <br>
                        <span>{{ item.SITUACION }}</span>
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-8">
                        <strong>Denominación oficial:</strong> <br>{{ item?.RTITLE || '-' }}
                    </p>
                    <p class="result-info px-2 py-1 col-12 col-md-4">
                        <strong>Tipo de Norma:</strong> <br>{{item.TPONRMA?.length > 0 ? item.TPONRMA?.map(o =>
                            o.DESCP).join(', ') : '-'}}
                    </p>
                </div>
            </div>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
        </div>

        <div v-if="resultados.length === 0 && !isLoading" class="no-results">
            <img src="@/assets/img/icons/no-results.svg" alt="No Results" />
            <p class="text-center text-lato" style="color: #727370">Aquí se reflejarán los resultados <br>de tu búsqueda
            </p>
        </div>

        <div class="floating-delitos">
            <div class="fixed bottom-0 start-50 translate-middle-x z-1050 mb-3 text-center"
                :class="{ 'card-visible': showCard }">
                <button class="py-2 px-3 btn dropdown-toggle dropdown-button" type="button" @click="toggleCard">
                    Sobre los filtros
                </button>
                <transition name="fade-slide">
                    <div v-if="showCard" class="card-items">
                        <div class="p-2 card-body" v-for="(item, index) in items" :key="index">
                            <div class="card-title">
                                <img src="@/assets/img/icons/questions.svg" alt="Info" class="info-icon" />
                                <h5>{{ item.title }}</h5>
                            </div>
                            <p class="card-text">{{ item.description }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalMostrarResolucion :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
            :pdfUrl="pdfUrl" :data="rowData" :role="role" />

    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { BFormTags, BPagination } from 'bootstrap-vue-next';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import { toast } from 'vue3-toastify';
import AutoComplete from 'primevue/autocomplete';

// PROXY
import MagistradoProxy from "../../proxies/Magistrados.Proxy.js";
import filterProxy from "../../proxies/FilterProxy.js";
import AdminEntriesProxy from "../../proxies/AdminEntriesProxy.js";
import ModalMostrarResolucion from './Modales/ModalMostrarResolucion.vue';

export default {
    data() {
        return {
            carouselConfig: {
                autoplay: 5000,
                breakpoints: {
                    640: {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                    },
                    768: {
                        itemsToShow: 2,
                        itemsToScroll: 2,
                    },
                    1024: {
                        itemsToShow: 3,
                        itemsToScroll: 3,
                    },
                    1280: {
                        itemsToShow: 3,
                        itemsToScroll: 3,
                    },
                },
            },
            topSearch: [],
            typeSaarch: "jurisprudences",
            isFilter: "jurisprudences-generales",
            criterioActual: "year-publication",
            isLoading: false,
            isCollapsed: true,
            showFilters: false,
            resultados: [],
            table: {
                currentPage: 1,
                perPage: 10,
                totalRows: 0
            },
            default: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: null,
                NMRCN: null,
                TPONRMA: null,
                OEMISOR: null,
                RECURSO: null,
                OJURISDICCIONAL: null,
                MAGISTRATES: null,
                JVINCULANTE: null,
                FRESOLUTION2: [],
                MATERIA: null,
                JURISDICCION: null,
                TITLE: null,
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
            },

            filter: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: null,
                NMRCN: null,
                TPONRMA: null,
                OEMISOR: null,
                RECURSO: null,
                OJURISDICCIONAL: null,
                MAGISTRATES: null,
                JVINCULANTE: null,
                FRESOLUTION2: [],
                MATERIA: null,
                JURISDICCION: null,
                TITLE: null,
                TYPE: "jurisprudences",
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
                CURRENTPAGE: 1,
                PERPAGE: 10,
                INDICADOR: 2
            },
            selects: {
                "MAGISTRATES": [],
                "DELITOS": [],
                "ÁMBITO": [],
                "ÓRGANO JURISDICCIONAL": [],
                "RECURSOS": [],
                "MATERIAS": [],
                "NORMA": [],
                "JURISPRUDENCIA VINCULANTE": [],
                "JURISDICCIONES": [],
                "TIPO DE NORMA": [],
                "ÓRGANO EMISOR": [],
            },
            showCard: false,
            items: [],
            Search,
            pdfUrl: '',
            openModal: false,
            dataComplete: [],
            rowData: {}
        };
    },
    components: {
        BPagination,
        BFormTags,
        AutoComplete,
        ModalMostrarResolucion,
        Slide,
        Pagination,
        Carousel,
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        scrollLeft() {
            this.$refs.scrollContainer.scrollLeft -= 200;
        },
        scrollRight() {
            this.$refs.scrollContainer.scrollLeft += 200;
        },
        toggleCard() {
            this.showCard = !this.showCard;
        },
        formateReverse(date) {
            try {
                if (!date) return null;
                const parts = date.split('-');
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            } catch (error) {
                console.error("Error al formatear la fecha:", error);
                return null;
            }
        },
        openModalWithData(item) {
            this.rowData = item;
            this.openModal = true;
        },
        searchSugges() {
            if (this.filter.GLOBAL?.length < 5) return;

            this.dataComplete.value = []
            AdminEntriesProxy.searchSugges({
                GLOBAL: this.filter.GLOBAL,
                TYPE: this.typeSaarch
            })
                .then((response) => {
                    this.dataComplete = response?.map((item) => {
                        return { DESCP: item?.DESCP.trim() }
                    });

                })
                .catch(() => {
                    this.dataComplete = []
                })
                .finally(() => this.isLoading = false);
        },
        // BUSQUEDA
        handleSearch(page) {
            let filtro = {
                INIT: ((page - 1) <= 0 ? 0 : (page - 1)) * this.table.perPage,
                ROWS: this.table.perPage
            };

            this.search(filtro);
        },
        async listTopSearch() {
            await AdminEntriesProxy.listTopSearch()
                .then((response) => {
                    this.topSearch = [];
                    if (!response) {
                        return;
                    }

                    this.topSearch = response?.map((item) => {
                        return { DESCP: item?.DESCP.trim() }
                    });

                    // campos unicos 
                    this.topSearch = this.topSearch.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.DESCP === item.DESCP
                        ))
                    );
                })
                .catch(() => {
                    this.topSearch = [];
                });
        },
        async search(ffff = {}) {
            this.isCollapsed = true;
            this.showFilters = true;
            let filtro = { ...this.filter, ...ffff };


            filtro.TYPE = this.typeSaarch;
            this.isLoading = true;

            let FRESOLUTIONFILTER = null;
            if (filtro.FRESOLUTION1 && filtro.FRESOLUTION2) {
                FRESOLUTIONFILTER = filtro.FRESOLUTION1 + ',' + filtro.FRESOLUTION2;
            } else if (filtro.FRESOLUTION1) {
                FRESOLUTIONFILTER = filtro.FRESOLUTION1 + ',';
            } else if (filtro.FRESOLUTION2) {
                FRESOLUTIONFILTER = ',' + filtro.FRESOLUTION2;
            }

            await AdminEntriesProxy.search({
                ...filtro,
                GLOBAL: filtro.GLOBAL?.DESCP || filtro.GLOBAL,
                FRESOLUTION: FRESOLUTIONFILTER,
                DELITO: filtro.DELITO ? filtro.DELITO.join(",") : null,
                RECURSO: filtro.RECURSO ? filtro.RECURSO.join(",") : null,
                OJURISDICCIONAL: filtro.OJURISDICCIONAL ? filtro.OJURISDICCIONAL.join(",") : null,
                MAGISTRATES: filtro.MAGISTRATES ? filtro.MAGISTRATES.join(",") : null,
                JVINCULANTE: filtro.JVINCULANTE ? filtro.JVINCULANTE.join(",") : null,
                MATERIA: filtro.MATERIA ? filtro.MATERIA.join(",") : null,
                JURISDICCION: filtro.JURISDICCION ? filtro.JURISDICCION.join(",") : null,
                ROWS: filtro?.ROWS || 10,
                INIT: filtro?.INIT || 0,
                NMRCN: filtro.NMRCN,
                TYPE: this.typeSaarch,
                AMBIT: this.isFilter == 'generales' ? null : (this.isFilter == 'jurisprudences-compliance' ? '466' : (this.isFilter == 'jurisprudences-extincion' ? '624' : null)),
                TPONRMA: filtro.TPONRMA ? filtro.TPONRMA.join(",") : null,
                OEMISOR: filtro.OEMISOR ? filtro.OEMISOR.join(",") : null,
                KEYWORDS: filtro.KEYWORDS ? filtro.KEYWORDS.join(",") : null,
                TEMA: filtro.TEMA,
                SUBTEMA: filtro.SUBTEMA,
                BLOG: filtro.BLOG ? 'emblematic' : null,
            })
                .then((response) => {
                    if (!response) {
                        this.resultados = [];
                        this.table.totalRows = 0;
                        return;
                    }
                    this.resultados = response?.map((item) => {
                        return {
                            ...item,
                            DELITO: JSON.parse(item.DELITO),
                            TPONRMA: JSON.parse(item.TPONRMA),
                            OEMISOR: JSON.parse(item.OEMISOR),
                            RECURSO: JSON.parse(item.RECURSO),
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            AMBIT: JSON.parse(item.AMBIT),
                            JURISDICCION: JSON.parse(item.JURISDICCION),
                            MAGISTRATES: JSON.parse(item.MAGISTRATES),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: ![null, undefined, ""].includes(item?.TEMA) ? item.TEMA : null,
                            SUBTEMA: ![null, undefined, ""].includes(item?.SUBTEMA) ? item.SUBTEMA : null,
                            SHORTSUMMARY: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? item.SHORTSUMMARY : null,
                            SHORTSUMMARY2: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 18) : null,
                            SHORTSUMMARY3: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 10000, false) : null,
                        };
                    });

                    this.table.totalRows = response?.[0]?.TOTALROWS || 0;
                })
                .catch(() => {
                    toast.error("Ocurrió un error al buscar", { toastId: "error" });
                })
                .finally(() => {
                    this.isLoading = false;
                    this.listTopSearch();
                });

        },
        setPalabras(palabra, cantidad = 15, isBandera = true) {
            if (!palabra) return "";
            return palabra.split(" ").slice(0, cantidad).join(" ") + (isBandera ? "..." : "") || "";
        },
        async filtersAll() {
            // this.isLoading = true;
            try {
                const [magistrados, filters] = await Promise.all([
                    MagistradoProxy.list({ ROWS: 1000, INIT: 0, DESC: null }).catch(() => []),
                    filterProxy.list({ NIVEL: 5 }, null).catch(() => []),
                ]);

                this.magistrados(magistrados);
                this.filtrosNiveles(filters);
            } catch (error) {
                toast.error("Ocurrió un error al cargar los filtros", { toastId: "error" });
                this.isLoading = false;

            } finally {
                this.isLoading = false;
            }
        },
        magistrados(magistrados) {
            this.selects["MAGISTRATES"] = magistrados
                .map(item => ({
                    value: item.ID,
                    label: `${item.APELLIDOS} ${item.NOMBRES}`,
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        },
        filtrosNiveles(data) {
            data.forEach(item => {
                const NIVEL_2 = JSON.parse(item.NIVEL_2);
                this.selects[item.LABEL.toUpperCase()] = NIVEL_2.map(item => ({
                    value: item.VALUE,
                    label: item.LABEL,
                    children: item.NIVEL_3.map(item2 => ({
                        value: item2.VALUE,
                        label: item2.LABEL,
                        children: item2.NIVEL_4.map(item3 => ({
                            value: item3.VALUE,
                            label: item3.LABEL,
                            children: item3.NIVEL_5.map(item4 => ({
                                value: item4.VALUE,
                                label: item4.LABEL,
                                children: item4.NIVEL_6.map(item5 => ({
                                    value: item5.VALUE,
                                    label: item5.LABEL,
                                })),
                            })),
                        })),
                    })),
                }));
            });

            this.items = data.map(item => ({
                title: item.LABEL,
                description: item.DESCPINF,
            }));
        },
        onClear() {
            this.filter.GLOBAL = null;
            this.filter.FRESOLUTION1 = null;
            this.filter.DELITO = null;
            this.filter.NMRCN = null;
            this.filter.TPONRMA = null;
            this.filter.OEMISOR = null;
            this.filter.RECURSO = null;
            this.filter.OJURISDICCIONAL = null;
            this.filter.MAGISTRATES = null;
            this.filter.JVINCULANTE = null;
            this.filter.FRESOLUTION2 = null;
            this.filter.MATERIA = null;
            this.filter.JURISDICCION = null;
            this.filter.TITLE = null;
            this.filter.CRITERIO = null;
            this.filter.KEYWORDS = [];
            this.filter.TEMA = null;
            this.filter.BLOG = false;
            this.filter.SUBTEMA = null;
            this.isFilter = "generales";

            this.isCollapsed = true;
            this.showFilters = false;
            this.dataComplete = [];
            this.resultados = [];
            this.table.currentPage = 1;
            this.table.perPage = 10;
            this.table.totalRows = 0;

            this.handleSearch(1);
        }


    },
    watch: {
        "role": {
            immediate: true,
            handler(val) {
                console.log("role", val);
            }
        },
        "filter.TYPE": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
        "isFilter": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.isLoading = true;
        this.listTopSearch();
        this.filtersAll();
    }
};
</script>


<style scoped>
.z-1050 {
    z-index: 1050;
}

/* CSS global o en <style scoped> */
.force-open-down {
    top: 100% !important;
    bottom: auto !important;
    transform: translateY(0px) !important;
}

/* Anula colocación automática hacia arriba */
.force-open-down[data-p-popper-placement^="top"] {
    top: 100% !important;
}


.dropdown-button {
    font-family: Lato;
    font-size: 14px;
    background-color: #FDE6FA;
    color: #E71FB3;
    border-radius: 10px 10px 0px 0px;
}

.card-items {
    font-family: Lato;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    background-color: #FDE6FA;
    color: #E71FB3;
}

@media (max-width: 768px) {
    .card-items {
        grid-template-columns: repeat(2, 1fr);
        width: max-content;
        margin: 0px 10px;
    }
}

.card-items .card-body {
    padding: 0px;
    margin: 0px;
    border-radius: 10px;
    background-color: #fff !important;
}

.card-items .card-body .card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px !important;
    font-weight: bold;
}

.card-items .card-body h5 {
    color: #262626;
    text-align: left;
    font-size: 11px !important;
}

.card-items .card-body p {
    color: #50504E;
    font-size: 10px !important;
    text-align: justify;
}

/* Transición suave del card */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.switch-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.switch-label {
    font-size: 16px;
    cursor: pointer;
}

.switch {
    position: relative;
    display: inline-block;
    border: 2px solid #acacac;
    border-radius: 20px;
    width: 50px;
    height: 25px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    margin: 0;
    /* Color de fondo cuando está apagado */
    border-radius: 25px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
}

.slider::before {
    content: "";
    position: absolute;
    height: 18px;
    width: 18px;
    left: 0px;
    bottom: 3.5px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    border: 1px solid #999;
}

/* Estado activado */
input:checked+.slider {
    background-color: #4CAF50;
    /* Verde cuando está encendido */
}

input:checked+.slider::before {
    transform: translateX(24px);
    background-color: #3b82f6 !important;
}

.form-switch .form-check-input {
    margin-left: 0rem !important;
}

.landing-busqueda {
    /* background-image: url("../../assets/img/backgrounds/bg-busqueda.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1; */

    background-image: url("../../assets/img/backgrounds/bg-busqueda.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    z-index: 1;
    min-height: 100vh;
}


.logo-busqueda {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    z-index: -1;
}

::v-deep(.p-autocomplete-input) {
    border: none !important;
    width: 100%;
    padding-right: 2rem;
}

/* Contenedor principal */
.search-container {
    display: flex;
    align-items: center;
    width: 90%;
    border-radius: 8px;
    position: relative;
    overflow: visible !important;
}

/* Contenedor del input */
.search-box {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px;
}

/* Estilos del input */
.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
    font-size: 14px;
    width: 100%;
}

/* Botón para limpiar */
.btn-clear {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 8px;
}

/* Separador */
.separator {
    width: 1px;
    height: 24px;
    background-color: #ddd;
    margin: 0 12px;
}

/* Botón de filtro */
.btn-filter {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

/* Botón de búsqueda */
.btn-search {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background 0.3s ease;
    border-radius: 10px;
}

.btn-search:hover {
    background-color: #0056b3;
}

.search-results {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 90%;
    margin: auto;
}

.result-item {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 12px;
}

/* Título */
.result-title {
    display: flex;
    font-family: Lato;
    justify-content: start;
    gap: 2px;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #1864FF;
    cursor: pointer;
}

/* Icono de flecha */
.result-title img {
    width: 16px;
    height: 16px;
}

/* Pretensión / Delito */
.result-info {
    font-size: 11px;
    font-family: Lato;
    margin: 6px 0;
    color: #727370;
}

/* Síntesis */
#filterbar {
    max-width: 600px;
}

/* // en mobil */
@media (max-width: 600px) {
    #filterbar {
        width: 100%;
    }
}


.result-summary {
    font-size: 13px;
    color: #555;
    line-height: 1.8;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu.filterbar-overlay {
    position: absolute;
    top: 100%;
    /* Justo debajo del botón */
    right: -20px;
    z-index: 1050;
    display: block;
    width: max-content !important;
    margin-top: 10px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.no-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

/* Responsivo */
@media (max-width: 600px) {
    .search-container {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .search-box {
        width: 100%;
        justify-content: space-between;
    }

    .btn-search {
        width: 90%;
        margin: 10px auto;
        padding: 12px 0;
        font-size: 16px;
    }


    .search-results {
        max-width: 100%;
        width: 90% !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .result-item {
        padding: 10px;
    }

    .result-title {
        font-size: 14px;
    }

    .result-info,
    .result-summary {
        font-size: 12px;
    }

    .dropdown-menu.filterbar-overlay {
        width: 100%;
        left: 0;
    }

    .dropdown-menu.filterbar-overlay .dropdown-item {
        padding: 8px 12px;
    }

    .no-results {
        margin-top: 10px;
    }

    #filterbar {
        /* // pocisionarlo al inicio */
        max-width: 350px;
        margin-left: -330px !important;

    }

}




@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}


.text-initial {
    margin-top: 3rem;
}


/* //celular */
@media (min-width: 320px) and (max-width: 600px) {
    .text-initial {
        margin-top: 0rem;
    }
}

.buttons-filter {
    display: flex;
    flex-direction: row;
}


@media (max-width: 768px) {
    .buttons-filter {
        display: flex;
        flex-direction: column;
    }

    .buttons-filter button {
        width: auto !important;
        justify-content: center;
    }
}

.card-container li {
    /* // ponerle estilo de li */
    list-style: outside;
}

.sin_resultados {
    padding: 20px;
    border-radius: 0.375rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #718096;
    font-size: 1.5rem;
    border: none;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    background-color: #f5f8ffff;
}


.sin_resultados p {
    margin: 0px;
}

.sin_resultados span {
    font-size: 1rem !important;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
    .sin_resultados {
        width: 90% !important;
        margin: 20px auto 0 auto !important;
    }

    .sin_resultados p {
        font-size: 1.2rem !important;
    }

    .sin_resultados span {
        font-size: 1rem !important;
    }
}

.container {
    margin: 40px auto
}

#header {
    width: 100%;
    height: 60px;
    box-shadow: 5px 5px 15px #e8e8e8
}

.col-lg-4,
.col-md-6 {
    padding-right: 0
}

button.btn.btn-hide {
    height: inherit;
    color: #fff;
    font-size: 0.82rem;
    padding-left: 40px;
    font-weight: bold;
    padding-right: 40px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
}



select {
    outline: none;
    padding: 6px 12px;
    margin: 0px 4px;
    color: #999;
    font-size: 0.85rem;
    width: 140px
}

#select2 {
    border: 1px solid #777;
    color: #999
}

#pro {
    border: none;
    color: #333;
    font-weight: 700;
    padding-left: 0px;
    width: initial
}

#filterbar {
    width: 30%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
    float: left
}

#filterbar input[type="radio"] {
    visibility: hidden
}

#filterbar input[type='radio']:checked {
    background-color: #16c79a;
    border: none
}

#filterbar .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 115px
}

#filterbar .btn.btn-success:hover {
    background-color: #e7f0ff !important;
    color: #444
}

#filterbar .btn-success:not(:disabled):not(.disabled).active,
#filterbar .btn-success:not(:disabled):not(.disabled):active {
    background-color: #3b82f6 !important;
    color: #fff
}

label {
    cursor: pointer
}

.tick {
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0
}

.tick input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.check {
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px
}

.tick:hover input~.check {
    background-color: #f3f3f3
}

.tick input:checked~.check {
    background-color: #ffffff
}

.check:after {
    content: "";
    position: absolute;
    display: none
}

.tick input:checked~.check:after {
    display: block;
    transform: rotate(45deg) scale(1)
}

.tick .check:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(2)
}

.box {
    padding: 10px
}

.box-label {
    color: #11698e;
    font-size: 0.9rem;
    font-weight: 800
}

#inner-box,
#inner-box2 {
    height: 150px;
    overflow-y: scroll
}

#inner-box2 {
    height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
    width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 2px
}

#price {
    height: 45px
}

#size input[type="checkbox"] {
    visibility: hidden
}

#size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 40px;
    font-size: 0.8rem;
    border-radius: 0
}

#size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#size label {
    margin: 10px;
    margin-left: 0px
}



#avail-size input[type="checkbox"] {
    visibility: hidden
}

#avail-size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#avail-size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 20px;
    font-size: 0.7rem;
    border-radius: 0;
    padding: 0
}

#avail-size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#avail-size .btn-success:not(:disabled):not(.disabled).active,
#avail-size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#avail-size label {
    margin: 10px;
    margin-left: 0px
}

#shirt {
    height: 170px
}

.middle {
    position: relative;
    width: 100%;
    margin-top: 25px
}

.slider {
    position: relative;
    z-index: 1;
    height: 5px;
    margin: 0px;
}

.slider>.track {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #ddd
}

.slider>.range {
    position: absolute;
    z-index: 2;
    left: 25%;
    right: 25%;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #36a31b
}

.slider>.thumb {
    position: absolute;
    top: 2px;
    z-index: 3;
    width: 20px;
    height: 20px;
    background-color: #36a31b;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(63, 204, 75, 0.705);
    transition: box-shadow .3s ease-in-out
}

.slider>.thumb::after {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 28%;
    top: 30%;
    border-radius: 50%;
    content: '';
    background-color: #fff
}

.slider>.thumb.left {
    left: 25%;
    transform: translate(-15px, -10px)
}

.slider>.thumb.right {
    right: 25%;
    transform: translate(15px, -10px)
}

.slider>.thumb.hover {
    box-shadow: 0 0 0 10px rgba(125, 230, 134, 0.507)
}

.slider>.thumb.active {
    box-shadow: 0 0 0 10px rgba(63, 204, 75, 0.623)
}

input[type=range] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 2;
    height: 10px;
    width: 100%;
    opacity: 0
}

input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
    -webkit-appearance: none
}

.del {
    text-decoration: line-through;
    color: red
}

@media(min-width:1199.6px) {
    #filterbar {
        width: 25%
    }
}

@media(max-width:1199.5px) {
    #filterbar {
        width: 28%
    }

    .card {
        height: 350px
    }

    .price {
        font-size: 0.9rem
    }

    .product-name {
        font-size: 0.8rem
    }
}

@media(max-width: 991.5px) {
    .navbar-nav {
        min-width: 290px;
        position: absolute;
        left: -168px;
        bottom: -146px;
        padding: 20px 10px;
        display: block;
        background-image: none;
        z-index: 2;
        background-color: #1d1c1cb2
    }

    #filterbar {
        width: 36%
    }

    #sort {
        background-color: inherit;
        color: #fff;
        margin: 0;
        margin-bottom: 20px;
        width: 100%
    }

    #sort option,
    #pro option {
        color: #000
    }

    #pro,
    #select2,
    .result {
        background-color: inherit;
        color: #fff
    }

    .card {
        height: 345px
    }

    .price {
        font-size: 0.85rem
    }
}

@media(max-width: 767.5px) {
    #filterbar {
        width: 50%
    }

    .form-switch .form-check-input {
        margin-left: 0rem !important;
    }
}

@media(max-width: 525.5px) {
    #filterbar {
        float: none;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px
    }

    #content.my-5 {
        margin-top: 20px !important;
        margin-bottom: 20px !important
    }

    .col-lg-4,
    .col-md-6 {
        padding-left: 0
    }
}

@media(max-width: 500.5px) {
    .pagination {
        display: none
    }
}

.card h3 {
    font-size: 1rem;
}


#filterbar-container {
    position: absolute;
    top: 100%;
    z-index: 1050;
    left: 0;
    width: 100%;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    border: 1px solid #ddd;
}

#filterbar-container .filter {
    display: grid;
    grid-template-columns: 20% 80%;
    gap: 10px;
    height: 400px;
    margin: 10px 0px;
    padding: 10px;
    border-radius: 10px;
}


@media (max-width: 700px) {
    #filterbar-container .filter {
        grid-template-columns: 1fr;
        height: auto;
    }


    #filterbar-container .contenedor-tab img {
        width: 20px;
        height: 20px;
    }
}

#filterbar-container .container-nav,
.contenedor-cabeceras-a a {
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    color: #11235A;
    cursor: pointer;
}

#filterbar-container ul li.container-nav {
    padding: 5px 0px 0px 2.5rem;
}



.active-criterio {
    color: #1864FF !important;
}

.contenedor-filtros {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    gap: 10px;
    margin: 10px 0px;
}

.filter-header {
    /* // border solo a la derecha */
    border-right: 1px solid #ddd;
}

.contenedor-cabeceras-a {
    border-bottom: 1px solid #ddd;
}

.contenedor-filtros .no-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;

}

.el-tree-select__popper .el-select-dropdown__item {
    white-space: normal !important;
}

.el-select-dropdown__wrap {
    max-height: 200px;
    overflow-y: auto;
}


.top-search-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    /* evita que el contenedor se expanda */
    padding: 0 10px;
    box-sizing: border-box;
}

.top-search-carousel {
    display: flex;
    align-items: center;
    width: 90%;
    gap: 5px;
    border-radius: 8px;
    position: relative;
    overflow: visible !important;
    /* Firefox */
}

/* Oculta scroll en navegadores Webkit */
.top-search-carousel::-webkit-scrollbar {
    display: none;
}

.top-search-chip {
    flex-shrink: 0;
    background-color: #fde6fa;
    color: #e71fb3;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.top-search-chip:hover {
    background-color: #f5d3f3;
    border-color: #e71fb3;
}

@media (max-width: 600px) {
    .top-search-carousel {
        flex-direction: column;
        width: 100%;
        padding: 0;
    }

    .top-search-chip {
        font-size: 10px;
        padding: 4px 10px;
    }
}
</style>
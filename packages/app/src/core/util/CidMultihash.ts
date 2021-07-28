// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable new-cap */

import type { HashCode } from 'multihashes';

import multihashes from 'multihashes';

import { isUndefined, u8aConcat, u8aToHex, u8aToU8a } from '@polkadot/util';
import {} from '@polkadot/types/interfaces';

import { CodecHash, Hash } from '@polkadot/types/interfaces';
import { u8, u64 } from '@polkadot/types/primitive';
import { AnyJson, AnyU8a, BareOpts, Codec, Registry } from '@polkadot/types/types';

/**
 * @name GenericCidMultihash
 * @description
 * This manages codec arrays. Internally it keeps track of the length (as decoded) and allows
 * construction with the passed `Type` in the constructor. It is an extension to Array, providing
 * specific encoding/decoding on top of the base type.
 */
export class GenericCidMultihash extends Uint8Array implements Codec {
  private _code: u64;
  private _size: u8;
  private _digest: Uint8Array;

  registry: Registry;
  createdAtHash?: Hash | undefined;

  constructor(registry: Registry, value?: AnyU8a) {
    const u8a: Uint8Array = u8aToU8a(value);
    const code: u64 = new u64(registry, u8a.slice(0, 8));

    const size: u8 = new u8(registry, u8a.slice(8, 9));
    const digest: Uint8Array = u8a.slice(9, size.toNumber() + 9);

    super(u8aConcat(code.toU8a(), size.toU8a(), digest));

    this._code = code;
    this._size = size;
    this._digest = digest;

    this.registry = registry;
  }

  public get code(): u64 {
    return this._code;
  }

  public get size(): u8 {
    return this._size;
  }

  public get digest(): Uint8Array {
    return this._digest;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength(): number {
    return this.length;
  }

  /**
   * @description returns a hash of the contents
   */
  public get hash(): CodecHash {
    return this.registry.hash(this.toU8a());
  }

  /**
   * @description Returns true if the type wraps an empty/default all-0 value
   */
  public get isEmpty(): boolean {
    return !this.encodedLength || isUndefined(this.find((value) => !!value));
  }

  public eq(other?: unknown): boolean {
    if (other instanceof Uint8Array) {
      return this.length === other.length && !this.some((value, index) => value !== other[index]);
    }

    return this.eq(u8aToU8a(other as any));
  }

  /**
   * @description Returns a hex string representation of the value
   */
  public toHex(): string {
    return u8aToHex(this.toU8a());
  }

  /**
   * @description Converts the Object to to a human-friendly JSON, with additional fields, expansion and formatting of information
   */
  public toHuman(): AnyJson {
    return this.toJSON();
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  public toJSON(): AnyJson {
    return {
      code: this._code.toNumber(),
      digest: u8aToHex(this._digest),
      size: this._size.toNumber()
    };
  }

  /**
   * @description Returns the base runtime type name for this instance
   */
  public toRawType(): string {
    return 'CidMultihash';
  }

  /**
   * @description Encodes the value as a Uint8Array as per the SCALE specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toU8a(isBare?: BareOpts): Uint8Array {
    return this;
  }

  /**
   * @description return ipfs cid's multihash
   */
  public toMultihash(): Uint8Array {
    return multihashes.encode(this._digest, this._code.toNumber() as HashCode, this._size.toNumber());
  }
}
